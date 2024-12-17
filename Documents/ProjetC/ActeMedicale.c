#include<stdio.h>
#include<stdlib.h>
#include <string.h>
#include <time.h>
#include"ActeMedicale.h"

struct Acte_medicale {
   int Id_Acte_medicale;
   char  Nom_Acte_medicale[50];
   char  Prix_acte_medicale[100];
   char  Date_Creation[15];
};  

void* saisire_Acte_medicale(int id_new_Acte_medicale){

struct Acte_medicale * Acte_medicale_saisir = (struct Acte_medicale *) malloc(sizeof(struct Acte_medicale));
    
    Acte_medicale_saisir->Id_Acte_medicale = id_new_Acte_medicale;

    printf("Entrer le nom d'acte_medicale \n");
    getchar();
    fgets(Acte_medicale_saisir->Nom_Acte_medicale, sizeof(Acte_medicale_saisir->Nom_Acte_medicale), stdin);
    Acte_medicale_saisir->Nom_Acte_medicale[strcspn(Acte_medicale_saisir->Nom_Acte_medicale, "\n")] = 0;
    
    printf("Entrer le prix d'acte_medicale \n");
    fgets(Acte_medicale_saisir->Prix_acte_medicale, sizeof(Acte_medicale_saisir->Prix_acte_medicale), stdin);
    Acte_medicale_saisir->Prix_acte_medicale[strcspn(Acte_medicale_saisir->Prix_acte_medicale, "\n")] = 0;

    time_t t;   
    time(&t);
    strcpy(Acte_medicale_saisir->Date_Creation,ctime(&t));

    return Acte_medicale_saisir;
}

void ajouter_acte_medicale(){
    
    FILE *bd_acte_medicale, *id_acte_medicale_file;
    char line[100];
    id_acte_medicale_file = fopen("id_acte_medicale_file.txt","a+");
    
    int id_acte_medicale = atoi(fgets(line, sizeof(line), id_acte_medicale_file));
    int id_new_acte_medicale = ++id_acte_medicale;
    fclose(id_acte_medicale_file);
    remove("id_acte_medicale_file.txt");

    FILE *id_acte_medicale_file1 = fopen("id_acte_medicale_file.txt","a+");

    fprintf(id_acte_medicale_file1,"%d",id_new_acte_medicale);
    fclose(id_acte_medicale_file1);

    struct Acte_medicale *Acte_medicale_ajouter ;
    Acte_medicale_ajouter = saisire_Acte_medicale(id_new_acte_medicale);

    printf("\n\n %d     %s      %s      %s \n\n", Acte_medicale_ajouter->Id_Acte_medicale, Acte_medicale_ajouter->Nom_Acte_medicale, Acte_medicale_ajouter->Prix_acte_medicale, Acte_medicale_ajouter->Date_Creation);
    bd_acte_medicale = fopen("bd_acte_medicale.txt", "a+");

    if (bd_acte_medicale == NULL)
    {
        perror("Erreur lors de l'ouverture du fichier");
        return;
    }

    fprintf(bd_acte_medicale, "%d;%s;%s;%s", Acte_medicale_ajouter->Id_Acte_medicale, Acte_medicale_ajouter->Nom_Acte_medicale, Acte_medicale_ajouter->Prix_acte_medicale, Acte_medicale_ajouter->Date_Creation);
    
    fclose(bd_acte_medicale);

    printf("L'acte medicale est ajoute avec success \n");
}

int recuperer_numero_ligne_acte_medicale_fichier(int id_parametre){
     
        FILE *bd_acte_medicale;
        char line[256],str[10];int i = 0;int j,numero_ligne = 1;

        bd_acte_medicale = fopen("bd_acte_medicale.txt","r");

        if (bd_acte_medicale == NULL) {
        // Gérez l'erreur
        perror("Erreur lors de l'ouverture du fichier");
        return 0;
        }

      while (fgets(line, sizeof(line), bd_acte_medicale)) {   
            i = 0;
            // on essaye de recuperer l'ID, on evite de lire toute la ligne   
            while (line[i] != ';')
            {
               i = i + 1;
            }
          //recupere l'id apartir le ligne et l'affecter a une chaine
            for(j = 0; j<i;j++)
                {str[j]=line[j];
              }
          str[i] = '\0';

          //convertire la chaine en entier
          int id_from_file = atoi(str);

          // on passer au traitment qu'on veut faire
          if(id_from_file == id_parametre){
              fclose(bd_acte_medicale);
              return numero_ligne;
          }
          numero_ligne++;
    }

    
    return 0;
}



void afficher_acte_medicale_par_ID(int id_parametre){

        //Overture du fichier et le test
        FILE *bd_acte_medicale;
        char line[256], str[10], *token;
        int ligne_counteur = 1, j;
        const char delim[] = ",";

        bd_acte_medicale = fopen("bd_acte_medicale.txt","r");

        if (bd_acte_medicale == NULL) {
        // Gérez l'erreur
        perror("Erreur lors de l'ouverture du fichier");
        return ;
        }

        int num_ligne = recuperer_numero_ligne_acte_medicale_fichier(id_parametre);
        if (!num_ligne) {
            printf("Il y'a pas d'acte medicake avec ce ID \n");
        }
      //On parcoure le fichier ligne par ligne
        while (fgets(line, sizeof(line), bd_acte_medicale)) {   
            if(num_ligne == ligne_counteur){
              printf("%s ",line);
            }
            ++ligne_counteur;
    } 

}


void supprimer_acte_medicale_par_ID(int id_parametre){

    
    int line_to_delete = recuperer_numero_ligne_acte_medicale_fichier(id_parametre);
    FILE *f1,*f2;
    char line[100];
    int current_line = 1;
    
    f1 = fopen("bd_acte_medicale.txt","a+");

    if (f1 == NULL) {
        printf("Error opening file!\n");
        return ;
    }

    f2 = fopen("temp.txt", "w");
    if (f2 == NULL) {
        printf("Error opening temp file\n");
        return ;
    }

     while (fgets(line, 100, f1) != NULL) {
        if (current_line != line_to_delete) {
            fputs(line, f2);
        }
        current_line++;
    }

    
    fclose(f1);
    fclose(f2);
    
    if (remove("bd_acte_medicale.txt") != 0) {
        perror("Error deleting file !\n");
        return ;
    }
    
    rename("temp.txt", "bd_acte_medicale.txt");
}

void update_acte_medicale_par_ID(int id_parametre){

    FILE *bd_acte_medicale;
    char line[100], *array_medecin[4];
    bd_acte_medicale = fopen("bd_acte_medicale.txt","r");

    struct Acte_medicale * acte_medicale_update = (struct Acte_medicale *) malloc(sizeof(struct Acte_medicale));
    
    int num_ligne =  recuperer_numero_ligne_acte_medicale_fichier(id_parametre), ligne_counteur = 1, i = 0;
    char *acte_medicale_line[4];
    char *token;

     while (fgets(line, sizeof(line), bd_acte_medicale)) {   
            if(num_ligne == ligne_counteur){

               token = strtok(line, ";");

                while(token != NULL) {
                acte_medicale_line[i++] = token;
                token = strtok(NULL, ";");
            }
             
              for (i = 0; i < 4; i++) {
        printf("%s      ", acte_medicale_line[i]);
    }


                 strcpy(acte_medicale_update->Nom_Acte_medicale, acte_medicale_line[1])  ; 
                 strcpy(acte_medicale_update->Prix_acte_medicale, acte_medicale_line[2]) ;
                strcpy(acte_medicale_update->Date_Creation, acte_medicale_line[3]) ;
                fclose(bd_acte_medicale);

                supprimer_acte_medicale_par_ID(id_parametre);
                printf("HH\n");
                 int choix ;char buff[200];
                 printf("Vous voulez changez quelle champs\n 1- Nom_Acte   2- Prix  \n");
                 scanf("%d",&choix);

                 if(choix == 1){

                    printf("Quelle est le nouveau Nom \n");
                    getchar();
                    fgets(buff, sizeof(buff),stdin);
                    buff[strcspn(buff, "\n")] = 0;
                    strcpy(acte_medicale_update->Nom_Acte_medicale, buff);
                    printf("Le nom est change avec success \n");

                 }else if(choix == 2){
                    
                    printf("Quelle est le nouveau Prix \n");
                    getchar();
                    fgets(buff, sizeof(buff),stdin);
                    buff[strcspn(buff, "\n")] = 0;
                    strcpy(acte_medicale_update->Prix_acte_medicale, buff);
                    printf("Le prix est change avec success \n");

                 }


                 bd_acte_medicale = fopen("bd_acte_medicale.txt","a");
                if (bd_acte_medicale == NULL)
                {
                    perror("Erreur lors de l'ouverture du fichier");
                    return;
                }

                fprintf(bd_acte_medicale, "%d;%s;%s;%s \n", id_parametre, acte_medicale_update->Nom_Acte_medicale, acte_medicale_update->Prix_acte_medicale, acte_medicale_update->Date_Creation);
                fclose(bd_acte_medicale);


    } 
        ligne_counteur++;
     }
}

void liste_actes_medicales(){

    char line[100];
    FILE *bd_acte_medicale;
    bd_acte_medicale = fopen("bd_acte_medicale.txt","r");

    while (fgets(line, sizeof(line), bd_acte_medicale))
        printf("%s",line);
    

    fclose(bd_acte_medicale);
}

void menu_acte_medical(){

    int choix, id_acte_medicale;

    printf("Veuillez-choissire une option \n");
    printf(" 1- Ajouter acte_medicale\n 2- Afficher acte_medicale par ID\n 3- Supprimer acte_medicale\n 4- Mettre a jour acte_medicale\n 5- Afficher la liste des actes_medicales\n\n");
    scanf("%d",&choix);

    if(choix == 1){
        ajouter_acte_medicale();
    }else if(choix == 2){
        printf("veuillez-saissire l'ID d'acte medicale que vous cherchez \n");
        scanf("%d",&id_acte_medicale);

        afficher_acte_medicale_par_ID(id_acte_medicale);
    }else if(choix == 3){

        printf("veuillez-saissire l'ID de l'acte medicale que vous voullez supprimer\n");
        scanf("%d",&id_acte_medicale);

        supprimer_acte_medicale_par_ID(id_acte_medicale);
        printf("L'acte medicale avec l'ID %d est supprimer avec success \n", id_acte_medicale);

    }else if(choix == 4){

        printf("veuillez-saissire l'ID de l'acte medicale que vous voullez mettre a jour\n");
        scanf("%d",&id_acte_medicale);

        update_acte_medicale_par_ID(id_acte_medicale);
    }else if(choix == 5){
        printf("Voici la liste des actes medicales \n");
        liste_actes_medicales();
    }
}
