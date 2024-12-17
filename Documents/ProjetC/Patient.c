#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<string.h>
#include<locale.h>
#include "Patient.h"

struct Patient 
{
	unsigned int IdPatient ; 
	char *Nom_Patient;
	char *Prenom_Patient;
	unsigned int Num_Patient;
	char *CIN;
	unsigned int Age;
};
typedef struct Patient patient;

char * SaisirChaine()
{
	unsigned int c, nbc = 0 ;
	char * str1 = NULL, * str2 = NULL ;
	
	while((c = getchar()) != '\n')
	{
		str2 = realloc(str1, (nbc+1)*sizeof(char)) ;
		if(str2 == NULL)
		{
			free(str1) ;
			printf("\n Barrette memoire saturee !!!") ;
			return NULL ;
		}
		str1 = str2 ;
		str1[nbc++] = c ;
	}
	str2 = realloc(str1, (nbc+1)*sizeof(char)) ;
	if(str2 == NULL)
	{
		free(str1) ;
		printf("\n Barrette memoire saturee !!!") ;
		return NULL ;
	}
	str1 = str2 ;
	str1[nbc] = '\0' ;
	return str1 ;
}
char * SaisirLigneFichier(FILE * pf)
{
    unsigned int c, nbc = 0 ;
    char * ch = NULL ;

    while(((c = fgetc(pf)) != '\n') && (c != EOF))
    {
        ch = realloc(ch, (nbc+1)*sizeof(char));
        ch[nbc++] = c ;
    }
    if((nbc > 0) || (c == '\n'))
    {
        ch = realloc(ch, (nbc+1)*sizeof(char));
        ch[nbc] = '\0' ;
        return ch ;
    }

    return NULL ;
}
void *SaisirPatient(patient *p)
{ 	

	setlocale(LC_CTYPE,"") ;
	printf("\n=>veulliez entrer les informations du patient : \t ");
	getchar() ;
	system("pause") ;
	printf("\n\tNom du patient :\t");		p->Nom_Patient = SaisirChaine();
	printf("\n\tPrenom du patient :\t");		p->Prenom_Patient = SaisirChaine();
	printf("\n\tCIN :\t");	p->CIN = SaisirChaine();
	printf("\n\tnumero de telephone du patient :\t");		scanf("%u",&(*p).Num_Patient);
	printf("\n\tAge :\t");	scanf("%u",&(*p).Age);	
}
int getAutoIncrementId()
{
    FILE *f = fopen("fichier_IdPatient", "a+");
    int id;
    char *ch;
    ch = SaisirLigneFichier(f);
    if (ch == NULL)
    {
        id = 1;
    }
    else
    {
        id = atoi(ch) + 1;
    }
    fclose(f);
    f = fopen("fichier_IdPatient", "w");
    fprintf(f, "%d", id);
    fclose(f) ;
    return id;
}
void create_patient()
{
	int test , nbre_ligne=0 ;
	char *ligne = malloc(500 * sizeof(char)) ; 
	FILE *fp = fopen("fichier_patient.txt" , "a+") ;
	
	char *ch ;
	patient *p = malloc(sizeof(patient)) ;
	
	p->IdPatient = getAutoIncrementId() ; 
	SaisirPatient(p) ; 

	fprintf(fp , "%u\t%s\t%s\t%s\t%u\t%u\n",p->IdPatient,p->Nom_Patient,p->Prenom_Patient,p->CIN,p->Age,p->Num_Patient) ;  
	fclose(fp);
	free(p) ;
	free(ligne) ; 
}
void read_patient()
{
	int choix , id_patient , i , j=0 ; 
	FILE *fp = fopen("fichier_patient.txt" , "r") ; 
	char *ligne , c;
	
	setlocale(LC_CTYPE,"") ;	
	printf("\tSi vous voulez afficher un patient bien precis tapez 0 sinon tapez 1 : \t") ;
	scanf("%d",&choix) ;
	rewind(fp) ;	
	if(c=fgetc(fp) == EOF)
		{
			printf("\nAucun patient trouv�\n\n") ;
			return ;	
		}
	rewind(fp) ;	
	if(choix == 0) 
	{
		printf("\nDonnez IdPatient : \t") ;
		scanf("%d",&id_patient) ;
	}
	switch (choix)
	{
		case 0 : {	 
				
					while(!feof(fp))  
					{ 
						ligne=SaisirLigneFichier(fp) ;
						i=ligne[0] ; 
						if(i-48 == id_patient)	{printf("%s\n",ligne) ; j++ ; break ;}
					}					
					if(j==0) { printf("Erreur en IdPatient donnee\n"); read_patient(); }; 
					break;
				  }
		case 1 : {	
				
					while(!feof(fp))    
						{
							ligne=SaisirLigneFichier(fp) ;
							printf("%s\n",ligne) ; 	
						}
						
					break;	
				 } 
		
	}
	fclose(fp);
	free(ligne) ; 
}

void delete_patient()
{	
	unsigned int  choix ;
	char c ;
	
	setlocale(LC_CTYPE,"") ;
	printf("si vous voulez effacer tous les patients tapez 1 sinon 0:\t") ;
	scanf("%u",&choix);
	

	switch(choix)
	{
		case 0 :{	FILE *fp = fopen("fichier_patient.txt","r") , *ech = fopen("echange.txt","w+") ;
					unsigned int id_patient , j=0 , i ;
					char *ligne=malloc(500*sizeof(char)) , *ch   ;
					
					if(c=fgetc(fp) == EOF)
					{
						printf("\nAucun patient trouv�\n\n") ;
						return ;	
					}
					rewind(fp) ;
					
					do 
					{	
						rewind(fp);//reintialiser le curseur en le mettant au d�but du fichier 
						printf("\nDonner l'identifiant du patient � effacer : \t");
						scanf("%d",&id_patient) ;
						while(!feof(fp))  //v�rifier si l'IdPatient existe
						{
							ligne=SaisirLigneFichier(fp) ;
							i = ligne[0] ; 
							if(i-48 == id_patient)	{j++ ; break ;}
						}		
					} while(j==0);
					rewind(fp) ;
					while(fgets(ligne,500,fp) != NULL)  
					{ 
						i=ligne[0] ; 
						if(i-48 != id_patient) //on va ins�rer dans le fichier �change que les lignes(les patients) # de id_patient du patient � effacer	
							fputs(ligne,ech) ;
					}				
					fclose(fp) ;					
					fclose(ech) ;
					
					remove("fichier_patient.txt") ;
					rename("echange.txt","fichier_patient.txt") ;
					free(ligne) ;
					printf("\npatient %u �cras� avec succ�s!\n\n",id_patient);
					break;
				}	
		case 1 :{
					FILE *fp = fopen("fichier_patient.txt","w+");
					if(c=fgetc(fp) == EOF)
					{
						printf("\nAucun patient trouv�\n\n") ;
						return ;	
					}
					rewind(fp) ;
					ftruncate(fileno(fp),0);
					printf("\npatients ecrasés avec succés!\n\n");
					fclose(fp) ;
					break;
				}
	}
}

void update_patient()
{
	FILE *fp = fopen("fichier_patient.txt","r") ; 
	char *ligne = malloc(500 * sizeof(int)) , c ;
	patient *p ;
	int i , j = 0 , patient_count=0 , choix , id_patient ;	
	
	setlocale(LC_CTYPE,"") ;
	if(c=fgetc(fp) == EOF)
		{
			printf("\nAucun patient trouv�\n\n") ;
			return ;	
		}
	rewind(fp) ;	
	do 
	{	
		rewind(fp);//reintialiser le curseur en le mettant au d�but du fichier 
		printf("\nDonner l'identifiant du patient a modifier : \t");
		scanf("%d",&id_patient) ;
		while(fgets(ligne,500,fp) != NULL)  
		{ 
			i = ligne[0] ; 
			if(i-48 == id_patient)	{j++ ; break ;}
		}		
	} while(j==0);
	rewind(fp) ; 
	printf("\nchoisissez l'attribut que vous voulez changer : \n");
	printf("\t1/Nom Patient\n\t2/Prenom Patient\n\t3/CIN\n\t4/Numero de telephone\n\t5/Age\n");
	scanf("%d",&choix) ;

	while(fgets(ligne,500,fp)!=NULL)
	{
		i = ligne[0] ; 
		if(i-48 == id_patient)	break ; 
	}
	rewind(fp) ;
	while (!feof(fp)) {
        fgets(ligne, 500, fp);
        patient_count = ligne[0] ; 
    }
   
	patient_count-=48 ;    
    p = (patient*) malloc(patient_count * sizeof(patient)) ;
    
 	for(i=1 ; i<=patient_count ; i++)
	{ 
		p[i].CIN = (char*) malloc(10 * sizeof(char)) ;	
	 	p[i].Nom_Patient = (char*) malloc(15 * sizeof(char)) ;	
	 	p[i].Prenom_Patient = (char*) malloc(10 * sizeof(char)) ;	
	}
	rewind(fp) ;
	for(i=1 ; i<=patient_count ; i++)
	{ 		
		fscanf(fp,"%u\t%s\t%s\t%s\t%u\t%u\n",&(p[i].IdPatient),p[i].Nom_Patient,p[i].Prenom_Patient,p[i].CIN,&(p[i].Age),&(p[i].Num_Patient)) ;		
	}
	fclose(fp) ;
	
	fp = fopen("fichier_patient.txt","w+");
    ftruncate(fileno(fp), 0);
	rewind(fp) ;
	for(i=1 ; i<=patient_count ; i++){
		if(i == id_patient)
		{
			switch(choix)
			{
				case 1 : { printf("=>\t");	scanf("%s", p[i].Nom_Patient) ; 	
						   break;}
				
				case 2 : { printf("=>\t");	scanf("%s",p[i].Prenom_Patient) ;	
						   break;}
				
				case 3 : { printf("=>\t");	scanf("%s",p[i].CIN) ;	
						   break;}
				
				case 4 : { printf("=>\t");	scanf("%u",&(p[i].Num_Patient)) ;	
						   break;}
				
				case 5 : { printf("=>\t");	scanf("%u",&(p[i].Age)) ;	
						   break;}
				
				default : {printf("\nERREUR\n") ;
						   break;}
			}
		}
		fprintf(fp,"%u\t%s\t%s\t%s\t%u\t%u\n",p[i].IdPatient,p[i].Nom_Patient,p[i].Prenom_Patient,p[i].CIN,p[i].Age,p[i].Num_Patient);
	}
	printf("\nModification effectu�e avec succ�s!\n\n");
	fclose(fp) ;
	free(ligne) ;
}
void menu_patient()
{
	int choix ; 
	printf("Donnez votre choix : ");
	printf("\n\t1/Create Patient.\n\t2/Read Patient.\n\t3/Delete Patient\n\t4/Update Patient.\n\t5/Quitter le programme.\n=>\t") ;
	scanf("%d",&choix) ; 
	switch(choix)
	{	
		case 1 : {create_patient() ; menu_patient() ;  break;}
		case 2 : {read_patient() ; menu_patient() ; break;}
		case 3 : {delete_patient() ; menu_patient() ; break;}
		case 4 : {update_patient() ; menu_patient() ; break;}
		case 5 : return ; 
		default : {menu_patient() ; break;}
	}
}
