typedef struct facture
{
    int id_facture;
    char *date_facture;
    int id_acte_medical;
} Facture;

void AfficherListeFactures(FILE *f)
void modifierFacture(FILE **f, int id_facture)
void supprimerFacture(FILE **f, int id_facture)
void AjouterFacture(FILE *f)
Facture LireFacture(FILE *f, int *etat)
int getAutoIncrementId3()
int verifierIntegriteActeMedical(int id_acte_medical)
char *SaisirLigneFichier3(FILE *pf)
char *SaisirChaineClavier3()
//void Menu_Facture();
