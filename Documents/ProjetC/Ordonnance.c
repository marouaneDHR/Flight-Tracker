#include <stdio.h>
#include <string.h>
#include <locale.h>
#include <malloc.h>
#include"Ordonnance.h"

typedef struct ordonnance
{
    int id_ordonnance;
    char *date_ordonnance;
} Ordonnance;

char *SaisirChaineClavier2()
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

char *SaisirLigneFichier2(FILE *pf)
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
int getAutoIncrementId2()
{
    FILE *f = fopen("fichier_ordonnance_id.txt", "a+");
    int id;
    char *ch;
    ch = SaisirLigneFichier2(f);
    if (ch == NULL)
    {
        id = 1;
    }
    else
    {
        id = atoi(ch) + 1;
    }
    fclose(f);
    f = fopen("fichier_ordonnance_id.txt", "w");
    fprintf(f, "%d", id);
    fclose(f);
    return id;
}
int verifierIntegriteGenere(int id_rdv, int id_facture)
{
    FILE *f_rdv = fopen("fichier_rdv.txt", "a+");
    FILE *f_facture = fopen("fichier_facture.txt", "a+");
    int check = 0, id;
    char ch[500];
    while (fgets(ch, 500, f_facture))
    {
        printf("hello \n");
        id = ch[0] - 48;
        printf("id : %d , id_facture_param : %d \n", id, id_facture);
        if (id == id_facture)
        {
            check = 1;
        }
    }
    printf("ch : %s", ch);
    if (!check)
    {
        printf("!!!!!! l'id du facture n'existe pas");
        return 0;
    }
    check = 0;
    while (fgets(ch, 500, f_rdv))
    {
        id = ch[0] - 48;
        printf("id rdv : %d \n", id);
        if (id == id_rdv)
        {
            check = 1;
        }
    }
    fclose(f_rdv);
    fclose(f_facture);
    if (!check)
    {
        printf("!!!!!! l'id du facture n'existe pas");
        return 0;
    }
    return 1;
}
int Genere(int id_rdv, int id_ordonnance, int id_facture)
{
    FILE *f = fopen("fichier_genere", "a+");
    if (!verifierIntegriteGenere(id_rdv, id_facture))
    {
        fclose(f);
        return 0;
    }
    fprintf(f, "%d\t%d\t%d\t\n", id_rdv, id_ordonnance, id_facture);
    fclose(f);
    return 1;
}
Ordonnance LireOrdonnance(FILE *f, int *etat)
{
    Ordonnance ordonnance;
    char *ch;
    int ordre, i, taille_date_ordonnance, counter;
    ch = SaisirLigneFichier2(f);
    if (ch == NULL)
    {
        *etat = 0;
        return ordonnance;
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
                taille_date_ordonnance = counter;
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
    ordonnance.date_ordonnance = malloc((taille_date_ordonnance) * sizeof(char));
    sscanf(ch, "%d\t%s\t", &ordonnance.id_ordonnance, ordonnance.date_ordonnance);
    *etat = 1;
    free(ch);
    return ordonnance;
}

void AjouterOrdonnance(FILE *f)
{
    Ordonnance ordonnance;
    int etat = 0, id_ordonnance, id_facture, id_rdv;
    printf("donnez une date de la forme suivante (jour-mois-annee)  : ");
    ordonnance.date_ordonnance = SaisirChaineClavier2();
    printf("entre l'id de facture : ");
    scanf("%d", &id_facture);
    printf("entre l'id du rendez-vous : ");
    scanf("%d", &id_rdv);
    etat = Genere(id_rdv, ordonnance.id_ordonnance, id_facture);
    while (!etat)
    {
        printf("entre l'id de facture : ");
        scanf("%d", &id_facture);
        printf("entre l'id du rendez-vous : ");
        scanf("%d", &id_rdv);
        etat = Genere(id_rdv, ordonnance.id_ordonnance, id_facture);
    }
    ordonnance.id_ordonnance = getAutoIncrementId2();
    fprintf(f, "%d\t%s\t\n", ordonnance.id_ordonnance, ordonnance.date_ordonnance);
    rewind(f);
}
void supprimerOrdonnance(FILE **f, int id_ordonnance)
{
    FILE *temp = fopen("temp.txt", "w");
    Ordonnance ordonnance;
    int etat;
    ordonnance = LireOrdonnance(*f, &etat);
    while (etat != 0)
    {
        if (ordonnance.id_ordonnance != id_ordonnance)
        {
            fprintf(temp, "%d\t%s\t\n", ordonnance.id_ordonnance, ordonnance.date_ordonnance);
        }
        ordonnance = LireOrdonnance(*f, &etat);
    }
    fclose(*f);
    fclose(temp);
    remove("fichier_ordonnance.txt");
    rename("temp.txt", "fichier_ordonnance.txt");
    *f = fopen("fichier_ordonnance.txt", "a+");
}
void modifierOrdonnance(FILE **f, int id_ordonnance)
{
    FILE *temp = fopen("temp.txt", "w");
    Ordonnance ordonnance;
    int etat;
    ordonnance = LireOrdonnance(*f, &etat);
    while (etat != 0)
    {
        if (ordonnance.id_ordonnance == id_ordonnance)
        {
            printf("entre une nouvelle date : ");
            ordonnance.date_ordonnance = SaisirChaineClavier2();
        }
        fprintf(temp, "%d\t%s\t\n", ordonnance.id_ordonnance, ordonnance.date_ordonnance);
        ordonnance = LireOrdonnance(*f, &etat);
    }
    fclose(*f);
    fclose(temp);
    remove("fichier_ordonnance.txt");
    rename("temp.txt", "fichier_ordonnance.txt");
    *f = fopen("fichier_ordonnance.txt", "a+");
}
void AfficherListeOrdonnances(FILE *f)
{
    int etat = 0;
    Ordonnance ordonnance;
    ordonnance = LireOrdonnance(f, &etat);
    while (etat != 0)
    {
        printf("id : %d , date de l'ordonnance : %s \n", ordonnance.id_ordonnance, ordonnance.date_ordonnance);
        ordonnance = LireOrdonnance(f, &etat);
    }
    rewind(f);
}
void Menu_Ordonnance()
{
    FILE *f = fopen("fichier_ordonnance.txt", "a+");
    int choix, id_ordonnance;
    if (f == NULL)
    {
        printf("fichier non ouvert");
        return;
    }
    printf("\n 1-ajouter une ligne \n 2-modifier une ligne \n 3-supprimer une ligne \n 4-lire les donnÃ©es \n 5-quitter \n entre un choix : ");
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
            AjouterOrdonnance(f);
            printf("liste après l'ajout : \n");
            AfficherListeOrdonnances(f);
        }
        else if (choix == 2)
        {
            printf("affichage du liste pour choisir l'id voulu \n ***************************************** \n");
            AfficherListeOrdonnances(f);
            printf("***************************************** \n");
            printf("entre l'id de l'ordonnance : ");
            scanf("%d", &id_ordonnance);
            getchar();
            modifierOrdonnance(&f, id_ordonnance);
            printf("affichage du liste après la modification : \n ***************************************** \n");
            AfficherListeOrdonnances(f);
            printf("***************************************** \n");
        }
        else if (choix == 3)
        {
            printf("affichage du liste pour choisir l'id voulu \n ***************************************** \n");
            AfficherListeOrdonnances(f);
            printf("***************************************** \n");
            printf("entre l'id de l'ordonnance : ");
            scanf("%d", &id_ordonnance);
            getchar();
            supprimerOrdonnance(&f, id_ordonnance);
            printf("affichage du liste après la suppression : \n ***************************************** \n");
            AfficherListeOrdonnances(f);
            printf("***************************************** \n");
        }
        else if (choix == 4)
        {
            AfficherListeOrdonnances(f);
        }
        printf("\n 1-ajouter une ligne \n 2-modifier une ligne \n 3-supprimer une ligne \n 4-lire les donnÃ©es \n 5-quitter \n entre un choix : ");
        scanf("%d", &choix);
        getchar();
    }
    if (choix == 5)
    {
        printf("le programme de l'ordonnance est terminÃ© \n");
    }
}


