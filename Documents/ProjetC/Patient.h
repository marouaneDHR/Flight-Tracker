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
char * SaisirLigneFichier(FILE * pf)
void *SaisirPatient(patient *p)
int getAutoIncrementId()
void create_patient()
void read_patient()
void delete_patient()
void update_patient()
//void menu_patient();
