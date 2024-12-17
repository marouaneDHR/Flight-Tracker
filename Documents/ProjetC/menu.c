#include<stdio.h>
#include<stdlib.h>
#include "Medecin.h"
#include "ActeMedicale.h"
#include "Patient.h"
#include "RendezVous.h"
#include "Ordonnance.h"
#include "Facture.h"
#include "menu.h"


void menu(){
    printf("Veuillez choisire une option \n 1- Medecin \n 2- Acte medical \n 3- Facture \n 4- Ordonnance \n 5- RDV \n 6- Patient \n");
    int choix;
    scanf("%d",&choix);
    if(choix == 1){
        menu_medecin();
    }else if(choix == 2){
        menu_acte_medical();
    }else if(choix == 3){
        Menu_Facture();
    }else if(choix == 4){
        Menu_Ordonnance();
    }else if(choix == 5){
        menu_rdv();
    }else if(choix == 6){
        menu_patient();
    }

}
