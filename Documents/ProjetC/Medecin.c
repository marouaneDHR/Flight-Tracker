#include<stdio.h>
#include<stdlib.h>
#include <string.h>
#include <time.h>
#include"Medecin.h"

//On considere tous les attrubits des string pour faciliter le code par la suite
struct Medecin {
   int Id_Medecin;
   char  Nom_Medecin[50];
   char  Prenom_Medecin[100];
   char   Numero_Telephone[10];
   char  CIN[20];
   char Age[5];
   char  Date_Creation[15];
};  


void* saisire_medecin(int id_new_medecin){

struct Medecin * medecin_saisir = (struct Medecin *) malloc(sizeof(struct Medecin));
    
    medecin_saisir->Id_Medecin = id_new_medecin;

    printf("Entrer le nom du medecin \n");
    getchar();
    fgets(medecin_saisir->Nom_Medecin, sizeof(medecin_saisir->Nom_Medecin), stdin);
    medecin_saisir->Nom_Medecin[strcspn(medecin_saisir->Nom_Medecin, "\n")] = 0;
    
    printf("Entrer le prenom du medecin \n");
    fgets(medecin_saisir->Prenom_Medecin, sizeof(medecin_saisir->Prenom_Medecin), stdin);
    medecin_saisir->Prenom_Medecin[strcspn(medecin_saisir->Prenom_Medecin, "\n")] = 0;

    printf("Entrer le numero de telephone du medecin \n");
    fgets(medecin_saisir->Numero_Telephone, sizeof(medecin_saisir->Numero_Telephone), stdin);
    medecin_saisir->Numero_Telephone[strcspn(medecin_saisir->Numero_Telephone, "\n")] = 0;

    printf("Entrer le CIN du medecin \n");
    getchar();
    fgets(medecin_saisir->CIN, sizeof(medecin_saisir->CIN), stdin);
    medecin_saisir->CIN[strcspn(medecin_saisir->CIN, "\n")] = 0;
    
    printf("Entrer le AGE du medecin \n");
    fgets(medecin_saisir->Age, sizeof(medecin_saisir->Age), stdin);
    medecin_saisir->Age[strcspn(medecin_saisir->Age, "\n")] = 0;

    time_t t;   
    time(&t);
    strcpy(medecin_saisir->Date_Creation,ctime(&t));

    return medecin_saisir;

}

void ajouter_Medecin(){
    
    FILE *bd_medecine, *id_medecin_file;
    char line[100];
    id_medecin_file = fopen("id_medecin.txt","a+");
    
    int id_medecin = atoi(fgets(line, sizeof(line), id_medecin_file));
    int id_new_medecin = ++id_medecin;
    fclose(id_medecin_file);
    remove("id_medecin.txt");

    FILE *id_medecin_file1 = fopen("id_medecin.txt","a+");
    fprintf(id_medecin_file1,"%d",id_new_medecin);
    fclose(id_medecin_file1);

    struct Medecin *medecin_ajouter ;
    medecin_ajouter = saisire_medecin(id_new_medecin);

    bd_medecine = fopen("bd_medecine.txt", "a+");

    if (bd_medecine == NULL)
    {
        perror("Erreur lors de l'ouverture du fichier");
        return;
    }

    fprintf(bd_medecine, "%d;%s;%s;%s;%s;%s;%s", medecin_ajouter->Id_Medecin, medecin_ajouter->Prenom_Medecin, medecin_ajouter->Nom_Medecin, medecin_ajouter->Numero_Telephone, medecin_ajouter->CIN, medecin_ajouter->Age, medecin_ajouter->Date_Creation);
    
    fclose(bd_medecine);

    printf("Le medecin est ajoute avec success \n");
}

// On cherche le numero de la ligne du medcine conserner et on initialise le counteur de les lignes avec 1
int recuperer_numero_ligne_medcine_fichier(int id_parametre){
     
        FILE *bd_medecine;
        char line[256],str[10];int i = 0;int j,numero_ligne = 1;

        bd_medecine = fopen("bd_medecine.txt","r");

        if (bd_medecine == NULL) {
        // Gérez l'erreur
        perror("Erreur lors de l'ouverture du fichier");
        return 0;
        }

      while (fgets(line, sizeof(line), bd_medecine)) {   
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
              fclose(bd_medecine);
              return numero_ligne;
          }
          numero_ligne++;
    }

    
    return 0;
}


void afficher_medecin_par_ID(int id_parametre){

        //Overture du fichier et le test
        FILE *bd_medecine;
        char line[256], str[10], *token;
        int ligne_counteur = 1, j;
        const char delim[] = ",";

        bd_medecine = fopen("bd_medecine.txt","r");

        if (bd_medecine == NULL) {
        // Gérez l'erreur
        perror("Erreur lors de l'ouverture du fichier");
        return ;
        }
        int num_ligne = recuperer_numero_ligne_medcine_fichier(id_parametre);
        if (!num_ligne) {
            printf("Il y'a pas de medecin avec ce ID \n");
        }
      //On parcoure le fichier ligne par ligne
        while (fgets(line, sizeof(line), bd_medecine)) {   
            if(num_ligne == ligne_counteur){
              printf("%s ",line);
            // token = strtok(line,';');
            // while (token != NULL) {
            //     // printf("%s\n", token);
            //     token = strtok(NULL, delim);
            // }
            }
            ++ligne_counteur;
    } 

}

void supprimer_medecin_par_ID(int id_parametre){

    
    int line_to_delete = recuperer_numero_ligne_medcine_fichier(id_parametre);
    FILE *f1,*f2;
    char line[100];
    int current_line = 1;
    
    f1 = fopen("bd_medecine.txt","a+");

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
    
    if (remove("bd_medecine.txt") != 0) {
        perror("Error deleting file !\n");
        return ;
    }
    
    rename("temp.txt", "bd_medecine.txt");
}

void update_medecin_par_ID(int id_parametre){

    FILE *bd_medecine;
    char line[100], *array_medecin[7];
    bd_medecine = fopen("bd_medecine.txt","r");

    struct Medecin * medecin_update = (struct Medecin *) malloc(sizeof(struct Medecin));

    int num_ligne =  recuperer_numero_ligne_medcine_fichier(id_parametre), ligne_counteur = 1, i = 0;
    


     while (fgets(line, sizeof(line), bd_medecine)) {   
            if(num_ligne == ligne_counteur){
    
              array_medecin[i] = strtok(line,";");
              while (array_medecin[i] != NULL) {
                array_medecin[i++] = strtok(NULL, ";");
                 }

                for(int j = 0; j<6;j++) printf("%s      ",array_medecin[j]);

                printf("\n");
                    
                 strcpy(medecin_update->Prenom_Medecin, array_medecin[0]);
                 strcpy(medecin_update->Nom_Medecin, array_medecin[1])  ; 
                 strcpy(medecin_update->Numero_Telephone, array_medecin[2]) ;
                 strcpy(medecin_update->CIN, array_medecin[3]); 
                 strcpy(medecin_update->Age, array_medecin[4]); 
                 strcpy(medecin_update->Date_Creation, array_medecin[5]);

                 fclose(bd_medecine);
                
                    
                 supprimer_medecin_par_ID(id_parametre);
                printf("HH\n");
                 int choix ;char buff[200];
                 printf("Vous voulez changez quelle champs\n 1- Prenom_Medecin   2- Nom_Medecin   3- Numero_Telephone   4- CIN   5- Age \n");
                 scanf("%d",&choix);
                 if(choix == 1){

                    printf("Quelle est le nouveau nom \n");
                    getchar();
                    fgets(buff, sizeof(buff),stdin);
                    buff[strcspn(buff, "\n")] = 0;
                    strcpy(medecin_update->Nom_Medecin, buff);
                    printf("Le nom est change avec success \n");

                 }else if(choix == 2){
                    
                    printf("Quelle est le nouveau prenom \n");
                    getchar();
                    fgets(buff, sizeof(buff),stdin);
                    buff[strcspn(buff, "\n")] = 0;
                    strcpy(medecin_update->Prenom_Medecin, buff);
                    printf("Le prenom est change avec success \n");

                 }else if(choix == 3){
                    
                    printf("Quelle est le nouveau Numero_Telephone \n");
                    getchar();
                    fgets(buff, sizeof(buff),stdin);
                    buff[strcspn(buff, "\n")] = 0;
                    strcpy(medecin_update->Numero_Telephone, buff);
                    printf("Le Numero_Telephone est change avec success \n");

                 }else if(choix == 4){
                    
                    printf("quelle est le nouveau CIN \n");
                    getchar();
                    fgets(buff, sizeof(buff),stdin);
                    buff[strcspn(buff, "\n")] = 0;
                    strcpy(medecin_update->CIN, buff);
                    printf("Le Numero_Telephone est changé avec success \n");

                 }else if(choix == 5){
                    
                    printf("Quelle est le nouveau Age \n");
                    getchar();
                    fgets(buff, sizeof(buff),stdin);
                    buff[strcspn(buff, "\n")] = 0;
                    strcpy(medecin_update->Age, buff);
                    printf("L'Age est change avec success \n");

                 }

                bd_medecine = fopen("bd_medecine.txt","a");
                if (bd_medecine == NULL)
                {
                    perror("Erreur lors de l'ouverture du fichier");
                    return;
                }

                fprintf(bd_medecine, "%d;%s;%s;%s;%s;%s;%s", id_parametre, medecin_update->Prenom_Medecin, medecin_update->Nom_Medecin, medecin_update->Numero_Telephone, medecin_update->CIN, medecin_update->Age, medecin_update->Date_Creation);
                fclose(bd_medecine);
                
            }
            ++ligne_counteur;
    } 
    

}

void liste_medecins(){

    char line[100];
    FILE *bd_medecine;
    bd_medecine = fopen("bd_medecine.txt","r");

    while (fgets(line, sizeof(line), bd_medecine))
        printf("%s",line);
    

    fclose(bd_medecine);
}


void menu_medecin(){

    int choix, id_medecin;

    printf("Veuillez-choissire une option \n");
    printf(" 1- Ajouter medecin\n 2- Afficher medecin par ID\n 3- Supprimer medecin\n 4- Mettre a jour\n 5- Afficher la liste des medecins\n\n");
    scanf("%d",&choix);

    if(choix == 1){
        ajouter_Medecin();
    }else if(choix == 2){
        printf("veuillez-saissire l'ID de medecine que vous cherchez \n");
        scanf("%d",&id_medecin);

        afficher_medecin_par_ID(id_medecin);
    }else if(choix == 3){

        printf("veuillez-saissire l'ID de medecine que vous voullez supprimer\n");
        scanf("%d",&id_medecin);

        supprimer_medecin_par_ID(id_medecin);
        printf("Le medecin avec l'ID %d est supprimer avec success \n", id_medecin);

    }else if(choix == 4){

        printf("veuillez-saissire l'ID de medecine que vous voullez mettre a jour\n");
        scanf("%d",&id_medecin);

        update_medecin_par_ID(id_medecin);
    }else if(choix == 5){
        printf("Voici la liste des medecins \n");
        liste_medecins();
    }
}

void test(){
    printf("TEST");
}
