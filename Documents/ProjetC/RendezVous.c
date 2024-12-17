#include<stdio.h>
#include<stdlib.h>
#include<unistd.h>
#include<string.h>
#include<locale.h>
#include"RendezVous.h"

struct Date 
{
	unsigned int j ; 
	unsigned int m ;
	unsigned int a ;
} ;
typedef struct Date date;

struct Rdv
{
	unsigned int IdRdv ;
	date d ;
	char *TypeRdv ;
	unsigned int IdPatient ; //foreign key 
	unsigned int IdMedecin ; //foreign key 
};
typedef struct Rdv rdv;

char * SaisirChaine1()
{
	unsigned int c, nbc = 0 ;
	char * str1 = NULL, * str2 = NULL ;
	
	while((c = getchar()) != '\n')
	{
		str2 = realloc(str1, (nbc+1)*sizeof(char)) ;
		if(str2 == NULL)
		{
			free(str1) ;
			printf("\n Barrette m�moire satur�e !!!") ;
			return NULL ;
		}
		str1 = str2 ;
		str1[nbc++] = c ;
	}
	str2 = realloc(str1, (nbc+1)*sizeof(char)) ;
	if(str2 == NULL)
	{
		free(str1) ;
		printf("\n Barrette m�moire satur�e !!!") ;
		return NULL ;
	}
	str1 = str2 ;
	str1[nbc] = '\0' ;
	return str1 ;
}
char * SaisirLigneFichier1(FILE * pf)
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

void *SaisirRdv(rdv *r)
{ 	

	setlocale(LC_CTYPE,"") ;
	printf("\n=>veulliez entrer les informations du RDV : \t ");
	getchar() ;
	system("pause") ;
	printf("\n\tType du Rendez-vous :\t");		r->TypeRdv = SaisirChaine1();
	printf("\n\tDate du Rendez-vous ( jj	mm	 aaaa )\t");		scanf("%u%u%u",&(*r).d.j,&(*r).d.m,&(*r).d.a) ;
	
	FILE *fp = fopen("fichier_patient.txt" , "r") ;
	
	unsigned int j = 0  , id ;
	char *ligne = malloc(500 * sizeof(char)) ; 

	do
	{
		printf("\n\tId du patient concern�\t") ;	scanf("%u",&(*r).IdPatient) ;
		while(fgets(ligne,500,fp))
		{
			id = ligne[0]  ;
			if(id-48 == r->IdPatient) j++ ;
		}
		rewind(fp) ;
	}while(j==0) ;
	
	FILE *fm = fopen("bd_medecine.txt" , "r") ;
	do
	{
		printf("\n\tId du médecin concerne\t") ;	scanf("%u",&(*r).IdMedecin) ;
		while(fgets(ligne,00,fp))
		{
			id = ligne[0]  ;
			if(id-48 == r->IdMedecin) j++ ;
		}
		rewind(fm) ;
	}while(j==0) ;
}
int getAutoIncrementId1()
{
    FILE *f = fopen("fichier_IdRdv.txt", "a+");
    int id;
    char *ch;
    ch = SaisirLigneFichier1(f);
    if (ch == NULL)
    {
        id = 1;
    }
    else
    {
        id = atoi(ch) + 1;
    }
    fclose(f);
    f = fopen("fichier_IdRdv.txt", "w");
    fprintf(f, "%d", id);
    fclose(f) ;
    return id;
}
void create_Rdv()	
{
	int test , nbre_ligne=0 ;
	char *ligne = malloc(500 * sizeof(char)) ; 
	FILE *frdv = fopen("fichier_rdv.txt" , "a+") ; 
	rdv *r = malloc(sizeof(rdv)) ;
	while(fgets(ligne,500,frdv))
		nbre_ligne++;
	
	SaisirRdv(r) ; 
	r->IdRdv = getAutoIncrementId1() ;
	fprintf(frdv , "%u\t%s\t%u/%u/%u\t%u\t%u\n",r->IdRdv,r->TypeRdv,r->d.j,r->d.m,r->d.a,r->IdPatient,r->IdMedecin) ;		
	fclose(frdv);
	free(r) ;
	free(ligne) ; 
}
void read_Rdv()
{
	int choix , id_rdv, i , j=0 ; 
	FILE *frdv = fopen("fichier_rdv.txt" , "r") ; 
	char *ligne , c;
	
	setlocale(LC_CTYPE,"") ;	
	printf("\tSi vous voulez afficher un rdv bien precis tapez 0 sinon tapez 1 : \t") ;
	scanf("%d",&choix) ;
		
	if(c=fgetc(frdv) == EOF)
		{
			printf("\nAucun rendez-vous trouv�\n\n") ;
			return ;	
		}
	rewind(frdv) ;	
	if(choix == 0) 
	{
		printf("\nDonnez IdRdv : \t") ;
		scanf("%d",&id_rdv) ;
	}
	switch (choix)
	{
		case 0 : {	 
				
					while(!feof(frdv))  
					{ 
						ligne=SaisirLigneFichier1(frdv) ;
						i=ligne[0] ; 
						if(i-48 == id_rdv)	{printf("%s\n",ligne) ; j++ ; break ;}
					}					
					if(j==0) { printf("Erreur en IdRdv donn�e\n"); read_Rdv(); }; 
					break;
				  }
		case 1 : {	
				
					while(!feof(frdv))    
						{
							ligne=SaisirLigneFichier1(frdv) ;
							printf("%s\n",ligne) ; 	
						}
						
					break;	
				 } 
		
	}
	fclose(frdv);
	free(ligne) ; 
}

void delete_Rdv()
{	
	unsigned int  choix ;
	char c ;
	
	setlocale(LC_CTYPE,"") ;
	printf("si vous voulez effacer tous les rendez-vous tapez 1 sinon 0:\t") ;
	scanf("%u",&choix);
	

	switch(choix)
	{
		case 0 :{	FILE *frdv = fopen("fichier_rdv.txt","r") , *ech = fopen("echange.txt","w+") ;
					unsigned int id_rdv , j=0 , i ;
					char *ligne=malloc(500*sizeof(char)) , *ch   ;
					
					if(c=fgetc(frdv) == EOF)
					{
						printf("\nAucun rendez-vous trouv�\n\n") ;
						return ;	
					}
					rewind(frdv) ;
					
					do 
					{	
						rewind(frdv);//reintialiser le curseur en le mettant au d�but du fichier 
						printf("\nDonner l'identifiant du rendez-vous � effacer : \t");
						scanf("%d",&id_rdv) ;
						while(!feof(frdv))  //v�rifier si l'IdPatient existe
						{
							ligne=SaisirLigneFichier1(frdv) ;
							i = ligne[0] ; 
							if(i-48 == id_rdv)	{j++ ; break ;}
						}		
					} while(j==0);
					rewind(frdv) ;
					while(fgets(ligne,500,frdv) != NULL)  
					{ 
						i=ligne[0] ; 
						if(i-48 != id_rdv) //on va ins�rer dans le fichier �change que les lignes(les patients) # de id_patient du patient � effacer	
							fputs(ligne,ech) ;
					}				

					fclose(frdv) ;					
					fclose(ech) ;
					remove("fichier_rdv.txt") ;
					rename("echange.txt","fichier_rdv.txt") ;

					free(ligne) ;
					printf("\nrendez-vous %u �cras� avec succ�s!\n\n",id_rdv);
					break;
				}	
		case 1 :{
					FILE *frdv = fopen("fichier_rdv.txt","w+");
					if(c=fgetc(frdv) == EOF)
					{
						printf("\nAucun rendez-vous trouv�\n\n") ;
						return ;	
					}
					rewind(frdv) ;
					ftruncate(fileno(frdv),0);
					printf("\nrendez-vous �cras�s avec succ�s!\n\n");
					fclose(frdv) ;
					break;
				}
	}
}

void update_Rdv()
{
	FILE *frdv = fopen("fichier_rdv.txt","r") ; 
	char *ligne = malloc(500 * sizeof(int)) , c ;
	rdv *r ;
	int i , j = 0 , rdv_count=0 , choix , id_rdv ;	
	
	setlocale(LC_CTYPE,"") ;
	if(c=fgetc(frdv) == EOF)
		{
			printf("\nAucun rendez-vous trouv�\n\n") ;
			return ;	
		}
	rewind(frdv) ;	
	do 
	{	
		rewind(frdv);//reintialiser le curseur en le mettant au d�but du fichier 
		printf("\nDonner l'identifiant du rendez-vous � modifier : \t");
		scanf("%d",&id_rdv) ;
		while(fgets(ligne,500,frdv) != NULL)  
		{ 
			i = ligne[0] ; 
			if(i-48 == id_rdv)	{j++ ; break ;}
		}		
	} while(j==0);
	rewind(frdv) ; 
	printf("\nchoisissez l'attribut que vous voulez changer : \n");
	printf("\t1/Type du rendez-vous\n\t2/Date du rendez-vous\n");
	scanf("%d",&choix) ;

	while(fgets(ligne,500,frdv)!=NULL)
	{
		i = ligne[0] ; 
		if(i-48 == id_rdv)	break ; 
	}
	rewind(frdv) ;
	while (!feof(frdv)) {
        fgets(ligne, 500, frdv);
        rdv_count = ligne[0] ; 
    }
   
	rdv_count-=48 ;    
    r = (rdv*) malloc(rdv_count * sizeof(rdv)) ;
    
 	for(i=1 ; i<=rdv_count ; i++)
	{ 
		r[i].TypeRdv = (char*) malloc(50 * sizeof(char)) ;	
	}
	rewind(frdv) ;
	for(i=1 ; i<=rdv_count ; i++)
	{ 		
		fscanf(frdv,"%u\t%s\t%u/%u/%u\t%u_t%u\n",&(r[i].IdRdv),r[i].TypeRdv,&(r[i].d.j),&(r[i].d.m),&(r[i].d.a),&(r[i].IdPatient),&(r[i].IdMedecin)) ;		
	}
	fclose(frdv) ;
	
	frdv = fopen("fichier_rdv.txt","w+");
    ftruncate(fileno(frdv), 0);
	rewind(frdv) ;
	for(i=1 ; i<=rdv_count ; i++){
		if(i == id_rdv)
		{
			switch(choix)
			{
				case 1 : { printf("=>\t");	scanf("%s", r[i].TypeRdv) ; 	
						   break;}
				
				case 2 : { printf("=>\t (jj mm aaaa) :\t");	scanf("%u%u%u",&(r[i].d.j),&(r[i].d.m),&(r[i].d.a)) ;	
						   break;}

				default : {printf("\nERREUR\n") ;
						   break;}
			}
		}
		fprintf(frdv , "%u\t%s\t%u/%u/%u\n",r[i].IdRdv,r[i].TypeRdv,r[i].d.j,r[i].d.m,r[i].d.a,r[i].IdPatient,r[i].IdMedecin) ;  
	}
	printf("\nModification effectu�e avec succ�s!\n\n");
	fclose(frdv) ;
	free(ligne) ;
}
void menu_rdv()
{
	int choix ; 
	printf("Donnez votre choix : ");
	printf("\n\t1/Create Rendez-vous.\n\t2/Read Rendez-vous.\n\t3/Delete Rendez-vous\n\t4/Update Rendez-vous.\n\t5/Quitter le programme.\n=>\t") ;
	scanf("%d",&choix) ; 
	switch(choix)
	{	
		case 1 : {create_Rdv() ; menu_rdv() ;  break;}
		case 2 : {read_Rdv() ; menu_rdv() ; break;}
		case 3 : {delete_Rdv() ; menu_rdv() ; break;}
		case 4 : {update_Rdv() ; menu_rdv() ; break;}
		case 5 : return ; 
		default : {menu_rdv() ; break;}
	}
}
