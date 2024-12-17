#include <stdio.h>
#include <string.h>
#include <locale.h>
#include <malloc.h>
#include"Facture.h"

typedef struct facture
{
    int id_facture;
    char *date_facture;
    int id_acte_medical;
} Facture;

char *SaisirChaineClavier3()
{
    unsigned int c, nbc = 0;
    char *ch = NULL;

    while ((c = getchar()) != '\n')
    {
        ch = realloc(ch, (nbc + 1) * sizeof(char));
        ch[nbc++] = c;
    }
    ch = realloc(ch, (nbc + 1) * sizeof(char));
    ch[nbc] = '\0';

    return ch;
}

char *SaisirLigneFichier3(FILE *pf)
{
    unsigned int c, nbc = 0;
    char *ch = NULL;

    while (((c = fgetc(pf)) != '\n') && (c != EOF))
    {
        ch = realloc(ch, (nbc + 1) * sizeof(char));
        ch[nbc++] = c;
    }
    if ((nbc > 0) || (c == '\n'))
    {
        ch = realloc(ch, (nbc + 1) * sizeof(char));
        ch[nbc] = '\0';
        return ch;
    }

    return NULL;
}
int verifierIntegriteActeMedical(int id_acte_medical)
{
    FILE *f_acte_medical = fopen("bd_acte_medicale.txt", "a+");
    int check = 0, id;
    char ch[500];
    while (fgets(ch, 500, f_acte_medical))
    {
        id = ch[0] - 48;
        if (id == id_acte_medical)
        {
            check = 1;
        }
    }
    if (!check)
    {
        printf("!!!!!! l'id de l'acte n'existe pas");
        return 0;
    }
    fclose(f_acte_medical);
    return 1;
}
int getAutoIncrementId3()
{
    FILE *f = fopen("fichier_facture_id.txt", "a+");
    int id;
    char *ch;
    ch = SaisirLigneFichier3(f);
    if (ch == NULL)
    {
        id = 1;
    }
    else
    {
        id = atoi(ch) + 1;
    }
    fclose(f);
    f = fopen("fichier_facture_id.txt", "w");
    fprintf(f, "%d", id);
    fclose(f);
    return id;
}
Facture LireFacture(FILE *f, int *etat)
{
    Facture facture;
    char *ch;
    int ordre, i, taille_date_Facture, counter;
    ch = SaisirLigneFichier3(f);
    if (ch == NULL)
    {
        *etat = 0;
        return facture;
    }
    ordre = 1;
    counter = 0;
    i = 0;
    while (ch[i] != '\0')
    {
        if (ch[i] == '\t')
        {
            if (ordre == 2)
            {
                taille_date_Facture = counter;
            }
            ordre++;
            counter = 0;
        }
        else
        {
            counter++;
        }
        i++;
    }
    facture.date_facture = malloc((taille_date_Facture) * sizeof(char));
    sscanf(ch, "%d\t%s\t%d\t", &facture.id_facture, facture.date_facture, &facture.id_acte_medical);
    *etat = 1;
    free(ch);
    return facture;
}
void AjouterFacture(FILE *f)
{
    Facture facture;
    int etat = 0, id_Facture, id_facture, id_rdv;
    facture.id_facture = ++id_Facture;
    printf("donnez une date de la forme suivante (jour-mois-annee) : ");
    facture.date_facture = SaisirChaineClavier3();
    printf("entre l'id de l'acte medical : ");
    scanf("%d", &facture.id_acte_medical);
    while (!verifierIntegriteActeMedical(facture.id_acte_medical))
    {
        printf("entre l'id de l'acte medical : ");
        scanf("%d", &facture.id_acte_medical);
    }
    facture.id_facture = getAutoIncrementId3();
    fprintf(f, "%d\t%s\t%d\t\n", facture.id_facture, facture.date_facture, facture.id_acte_medical);
    rewind(f);
}
void supprimerFacture(FILE **f, int id_facture)
{
    FILE *temp = fopen("temp.txt", "w");
    Facture facture;
    int etat;
    facture = LireFacture(*f, &etat);
    while (etat != 0)
    {
        if (facture.id_facture != id_facture)
        {
            fprintf(temp, "%d\t%s\t%d\t\n", facture.id_facture, facture.date_facture, facture.id_acte_medical);
        }
        facture = LireFacture(*f, &etat);
    }
    fclose(*f);
    fclose(temp);
    remove("fichier_facture.txt");
    rename("temp.txt", "fichier_facture.txt");
    *f = fopen("fichier_facture.txt", "a+");
}
void modifierFacture(FILE **f, int id_facture)
{
    FILE *temp = fopen("temp.txt", "w");
    Facture facture;
    int etat;
    facture = LireFacture(*f, &etat);
    while (etat != 0)
    {
        if (facture.id_facture == id_facture)
        {
            printf("entre une nouvelle date : ");
            facture.date_facture = SaisirChaineClavier3();
        }
        fprintf(temp, "%d\t%s\t%d\t\n", facture.id_facture, facture.date_facture, facture.id_acte_medical);

        facture = LireFacture(*f, &etat);
    }
    fclose(*f);
    fclose(temp);
    remove("fichier_facture.txt");
    rename("temp.txt", "fichier_facture.txt");
    *f = fopen("fichier_facture.txt", "a+");
}
void AfficherListeFactures(FILE *f)
{
    int etat = 0;
    Facture facture;
    facture = LireFacture(f, &etat);
    while (etat != 0)
    {
        printf("id_facture : %d , date de la facture : %s , id_acte_medical: %d \n", facture.id_facture, facture.date_facture, facture.id_acte_medical);
        facture = LireFacture(f, &etat);
    }
    rewind(f);
}
void Menu_Facture()
{
    FILE *f = fopen("fichier_facture.txt", "a+");
    int choix, id_Facture;
    if (f == NULL)
    {
        printf("fichier non ouvert");
        return;
    }
    printf("\n 1-ajouter une ligne \n 2-modifier une ligne \n 3-supprimer une ligne \n 4-lire les données \n 5-quitter \n entre un choix : ");
    scanf("%d", &choix);
    getchar();
    while (choix != 1 && choix != 2 && choix != 3 && choix != 4 && choix != 5)
    {
        printf("ce choix n'existe pas \n entre le choix de nouveau :");
        scanf("%d", &choix);
        getchar();
    }
    while (choix != 5)
    {
        if (choix == 1)
        {
            AjouterFacture(f);
            printf("liste après l'ajout : \n");
            AfficherListeFactures(f);
        }
        else if (choix == 2)
        {
            printf("affichage du liste pour choisir l'id voulu \n ***************************************** \n");
            AfficherListeFactures(f);
            printf("***************************************** \n");
            printf("entre l'id de la facture : ");
            scanf("%d", &id_Facture);
            getchar();
            modifierFacture(&f, id_Facture);
            printf("affichage du liste après la modification : \n ***************************************** \n");
            AfficherListeFactures(f);
            printf("***************************************** \n");
        }
        else if (choix == 3)
        {
            printf("affichage du liste pour choisir l'id voulu \n ***************************************** \n");
            AfficherListeFactures(f);
            printf("***************************************** \n");
            printf("entre l'id de la facture : ");
            scanf("%d", &id_Facture);
            getchar();
            supprimerFacture(&f, id_Facture);
            printf("affichage du liste après la suppression : \n ***************************************** \n");
            AfficherListeFactures(f);
            printf("***************************************** \n");
        }
        else if (choix == 4)
        {
            printf("affichage du liste : \n ***************************************** \n");
            AfficherListeFactures(f);
            printf("***************************************** \n");
        }
        printf("\n 1-ajouter une ligne \n 2-modifier une ligne \n 3-supprimer une ligne \n 4-lire les données \n 5-quitter \n entre un choix : ");
        scanf("%d", &choix);
        getchar();
    }
    if (choix == 5)
    {
        printf("le programme est terminé \n");
    }
    fclose(f);
}

