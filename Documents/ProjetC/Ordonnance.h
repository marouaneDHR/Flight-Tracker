typedef struct ordonnance
{
    int id_ordonnance;
    char *date_ordonnance;
} Ordonnance;

char *SaisirChaineClavier2()
char *SaisirLigneFichier2(FILE *pf)
int getAutoIncrementId2()
int verifierIntegriteGenere(int id_rdv, int id_facture)
int Genere(int id_rdv, int id_ordonnance, int id_facture)
Ordonnance LireOrdonnance(FILE *f, int *etat)
void AjouterOrdonnance(FILE *f)
void supprimerOrdonnance(FILE **f, int id_ordonnance)
void modifierOrdonnance(FILE **f, int id_ordonnance)
void AfficherListeOrdonnances(FILE *f)
//void Menu_Ordonnance();
