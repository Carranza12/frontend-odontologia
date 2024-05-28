import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormControlDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSignaturePadComponent } from '@eve-sama/ngx-signature-pad';
import { ApiService } from 'src/app/api.service';
import { asignaturaService } from 'src/app/asignatura.service';
import { PerfilEstudiantesService } from 'src/app/empleado/services/perfil_estudiantes.service';
import { GeneralService } from 'src/app/general.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historia-clinica-edit',
  templateUrl: './historia-clinica-edit.component.html',
  styleUrls: ['./historia-clinica-edit.component.scss'],
})

export class HistoriaClinicaEditComponent implements OnInit{

  public esMayorDeEdad: boolean = false;
  public esMenordeEdad: boolean = false;

  public isBlockedHistoriaInfo:boolean = false;

  public diagnosticosList:any[] = [];
  public tratamientosList:any[] = [];
/*Elementos de la firma*/ 
  @ViewChild('signature') signature!: NgxSignaturePadComponent;
  public firmaImagen: any = null;

  public firmaImagenShow: string | null = null;
  public showEditFirma: boolean = false;
  public isEditHistoria: boolean = false;

  public usuarioLogeado:any;
  public ciudades: any = []
  public user_id!: string;
  public perfilForm = this.formBuilder.group({
    expediente: ['', Validators.required],
    cedula_profesional: ['', Validators.required],
    universidad: ['', Validators.required],
    especialidad: ['', Validators.required],
  });

  public options: any = {
    backgroundColor: '#F4F5F5',
    minWidth: 1,
    
    css: {
      /*'border': '1px dashed #000',
      'width': '300px',
      'margin-bottom': '20px',*/

      'border': '1px solid #ccc',
      'height': '200px',
      'width': '400px',
    },
  };

  onBeginSign(): void {
  }

  onEndSign(): void {
    if (this.signature) {
      this.firmaImagen = this.signature.toDataURL();
    }
  }

  async dataURLtoBlob(dataURL: string): Promise<Blob> {
    return new Promise((resolve) => {
      const byteString = atob(dataURL.split(',')[1]);
      const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      resolve(blob);
    });
  }
  
  public gender_options = [
    {
      value: 'm',
      text: 'Masculino',
    },
    {
      value: 'f',
      text: 'Femenino',
    },
  ];

  public paises = [
    { value: 'México', text: 'México' },
  ]

  public estadosMexico = [
    {
      value: 'Aguascalientes',
      text: 'Aguascalientes',
      municipios: [
        'Aguascalientes',
        'Asientos',
        'Calvillo',
        'Cosío',
        'Jesús María',
        'Pabellón de Arteaga',
        'Rincón de Romos',
        'San José de Gracia',
        'Tepezalá',
        'El Llano',
        'San Francisco de los Romo'
      ]
    },
    {
        value: 'Baja California',
        text: 'Baja California',
        municipios: [
          'Ensenada',
          'Mexicali',
          'Tecate',
          'Tijuana',
          'Playas de Rosarito',
          'San Quintín',
          'San Felipe*'
        ]
      },
      {
        value: 'Baja California Sur',
        text: 'Baja California Sur',
        municipios: [
          'Comondú',
          'Mulegé',
          'La Paz',
          'Los Cabos',
          'Loreto'
        ]
      },
      {
        value: 'Campeche',
        text: 'Campeche',
        municipios: [
          'Calkiní',
          'Campeche',
          'Carmen',
          'Champotón',
          'Hecelchakán',
          'Hopelchén',
          'Palizada',
          'Tenabo',
          'Escárcega',
          'Calakmul',
          'Candelaria',
          'Seybaplaya',
          'Dzitbalché*'
        ]
      },
      {
        value: 'Coahuila',
        text: 'Coahuila',
        municipios: [
          'Abasolo',
          'Acuña',
          'Allende',
          'Arteaga',
          'Candela',
          'Castaños',
          'Cuatro Ciénegas',
          'Escobedo',
          'Francisco I. Madero',
          'Frontera',
          'General Cepeda',
          'Guerrero',
          'Hidalgo',
          'Jiménez',
          'Juárez',
          'Lamadrid',
          'Matamoros',
          'Monclova',
          'Morelos',
          'Múzquiz',
          'Nadadores',
          'Nava',
          'Ocampo',
          'Parras',
          'Piedras Negras',
          'Progreso',
          'Ramos Arizpe',
          'Sabinas',
          'Sacramento',
          'Saltillo',
          'San Buenaventura',
          'San Juan de Sabinas',
          'San Pedro',
          'Sierra Mojada',
          'Torreón',
          'Viesca',
          'Villa Unión',
          'Zaragoza'
        ]
      },
      {
        value: 'Colima',
        text: 'Colima',
        municipios: [
          'Armería',
          'Colima',
          'Comala',
          'Coquimatlán',
          'Cuauhtémoc',
          'Ixtlahuacán',
          'Manzanillo',
          'Minatitlán',
          'Tecomán',
          'Villa de Álvarez'
        ]
      },
      {
        value: 'Chiapas',
        text: 'Chiapas',
        municipios: [
          'Acacoyagua',
          'Acala',
          'Acapetahua',
          'Altamirano',
          'Amatán',
          'Amatenango de la Frontera',
          'Amatenango del Valle',
          'Ángel Albino Corzo',
          'Arriaga',
          'Bejucal de Ocampo',
          'Bella Vista',
          'Berriozábal',
          'Bochil',
          'El Bosque',
          'Cacahoatán',
          'Catazajá',
          'Cintalapa',
          'Coapilla',
          'Comitán de Domínguez',
          'La Concordia',
          'Copainalá',
          'Chalchihuitán',
          'Chamula',
          'Chanal',
          'Chapultenango',
          'Chenalhó',
          'Chiapa de Corzo',
          'Chiapilla',
          'Chicoasén',
          'Chicomuselo',
          'Chilón',
          'Escuintla',
          'Francisco León',
          'Frontera Comalapa',
          'Frontera Hidalgo',
          'La Grandeza',
          'Huehuetán',
          'Huixtán',
          'Huitiupán',
          'Huixtla',
          'La Independencia',
          'Ixhuatán',
          'Ixtacomitán',
          'Ixtapa',
          'Ixtapangajoya',
          'Jiquipilas',
          'Jitotol',
          'Juárez',
          'Larráinzar',
          'La Libertad',
          'Mapastepec',
          'Las Margaritas',
          'Mazapa de Madero',
          'Mazatán',
          'Metapa',
          'Mitontic',
          'Motozintla',
          'Nicolás Ruíz',
          'Ocosingo',
          'Ocotepec',
          'Ocozocoautla de Espinosa',
          'Ostuacán',
          'Osumacinta',
          'Oxchuc',
          'Palenque',
          'Pantelhó',
          'Pantepec',
          'Pichucalco',
          'Pijijiapan',
          'El Porvenir',
          'Villa Comaltitlán',
          'Pueblo Nuevo Solistahuacán',
          'Rayón',
          'Reforma',
          'Las Rosas',
          'Sabanilla',
          'Salto de Agua',
          'San Cristóbal de las Casas',
          'San Fernando',
          'Siltepec',
          'Simojovel',
          'Sitalá',
          'Socoltenango',
          'Solosuchiapa',
          'Soyaló',
          'Suchiapa',
          'Suchiate',
          'Sunuapa',
          'Tapachula',
          'Tapalapa',
          'Tapilula',
          'Tecpatán',
          'Tenejapa',
          'Teopisca',
          'Tila',
          'Tonalá',
          'Totolapa',
          'La Trinitaria',
          'Tumbalá',
          'Tuxtla Gutiérrez',
          'Tuxtla Chico',
          'Tuzantán',
          'Tzimol',
          'Unión Juárez',
          'Venustiano Carranza',
          'Villa Corzo',
          'Villaflores',
          'Yajalón',
          'San Lucas',
          'Zinacantán',
          'San Juan Cancuc',
          'Aldama',
          'Benemérito de las Américas',
          'Maravilla Tenejapa',
          'Marqués de Comillas',
          'Montecristo de Guerrero',
          'San Andrés Duraznal',
          'Santiago el Pinar',
          'Capitán Luis Ángel Vidal',
          'Rincón Chamula San Pedro',
          'El Parral',
          'Emiliano Zapata',
          'Mezcalapa',
          'Honduras de la Sierra'
        ]
      },
      {
        value: 'Chihuahua',
        text: 'Chihuahua',
        municipios: [
          'Ahumada',
          'Aldama',
          'Allende',
          'Aquiles Serdán',
          'Ascensión',
          'Bachíniva',
          'Balleza',
          'Batopilas de Manuel Gómez Morín',
          'Bocoyna',
          'Buenaventura',
          'Camargo',
          'Carichí',
          'Casas Grandes',
          'Coronado',
          'Coyame del Sotol',
          'La Cruz',
          'Cuauhtémoc',
          'Cusihuiriachi',
          'Chihuahua',
          'Chínipas',
          'Delicias',
          'Dr. Belisario Domínguez',
          'Galeana',
          'Santa Isabel',
          'Gómez Farías',
          'Gran Morelos',
          'Guachochi',
          'Guadalupe',
          'Guadalupe y Calvo',
          'Guazapares',
          'Guerrero',
          'Hidalgo del Parral',
          'Huejotitán',
          'Ignacio Zaragoza',
          'Janos',
          'Jiménez',
          'Juárez',
          'Julimes',
          'López',
          'Madera',
          'Maguarichi',
          'Manuel Benavides',
          'Matachí',
          'Matamoros',
          'Meoqui',
          'Morelos',
          'Moris',
          'Namiquipa',
          'Nonoava',
          'Nuevo Casas Grandes',
          'Ocampo',
          'Ojinaga',
          'Praxedis G. Guerrero',
          'Riva Palacio',
          'Rosales',
          'Rosario',
          'San Francisco de Borja',
          'San Francisco de Conchos',
          'San Francisco del Oro',
          'Santa Bárbara',
          'Satevó',
          'Saucillo',
          'Temósachic',
          'El Tule',
          'Urique',
          'Uruachi',
          'Valle de Zaragoza'
        ]
      },
      {
        value: 'Ciudad de México',
        text: 'Ciudad de México',
        municipios: [
          'Azcapotzalco',
          'Coyoacán',
          'Cuajimalpa de Morelos',
          'Gustavo A. Madero',
          'Iztacalco',
          'Iztapalapa',
          'La Magdalena Contreras',
          'Milpa Alta',
          'Álvaro Obregón',
          'Tláhuac',
          'Tlalpan',
          'Xochimilco',
          'Benito Juárez',
          'Cuauhtémoc',
          'Miguel Hidalgo',
          'Venustiano Carranza'
        ]
      },
      {
        value: 'Durango',
        text: 'Durango',
        municipios: [
          'Canatlán',
          'Canelas',
          'Coneto de Comonfort',
          'Cuencamé',
          'Durango',
          'General Simón Bolívar',
          'Gómez Palacio',
          'Guadalupe Victoria',
          'Guanaceví',
          'Hidalgo',
          'Indé',
          'Lerdo',
          'Mapimí',
          'Mezquital',
          'Nazas',
          'Nombre de Dios',
          'Ocampo',
          'El Oro',
          'Otáez',
          'Pánuco de Coronado',
          'Peñón Blanco',
          'Poanas',
          'Pueblo Nuevo',
          'Rodeo',
          'San Bernardo',
          'San Dimas',
          'San Juan de Guadalupe',
          'San Juan del Río',
          'San Luis del Cordero',
          'San Pedro del Gallo',
          'Santa Clara',
          'Santiago Papasquiaro',
          'Súchil',
          'Tamazula',
          'Tepehuanes',
          'Tlahualilo',
          'Topia',
          'Vicente Guerrero',
          'Nuevo Ideal'
        ]
      },
      {
        value: 'Guanajuato',
        text: 'Guanajuato',
        municipios: [
          'Abasolo',
          'Acámbaro',
          'San Miguel de Allende',
          'Apaseo el Alto',
          'Apaseo el Grande',
          'Atarjea',
          'Celaya',
          'Manuel Doblado',
          'Comonfort',
          'Coroneo',
          'Cortazar',
          'Cuerámaro',
          'Doctor Mora',
          'Dolores Hidalgo Cuna de la Independencia Nacional',
          'Guanajuato',
          'Huanímaro',
          'Irapuato',
          'Jaral del Progreso',
          'Jerécuaro',
          'León',
          'Moroleón',
          'Ocampo',
          'Pénjamo',
          'Pueblo Nuevo',
          'Purísima del Rincón',
          'Romita',
          'Salamanca',
          'Salvatierra',
          'San Diego de la Unión',
          'San Felipe',
          'San Francisco del Rincón',
          'San José Iturbide',
          'San Luis de la Paz',
          'Santa Catarina',
          'Santa Cruz de Juventino Rosas',
          'Santiago Maravatío',
          'Silao de la Victoria',
          'Tarandacuao',
          'Tarimoro',
          'Tierra Blanca',
          'Uriangato',
          'Valle de Santiago',
          'Victoria',
          'Villagrán',
          'Xichú',
          'Yuriria'
        ]
      },
      {
        value: 'Guerrero',
        text: 'Guerrero',
        municipios: [
          'Acapulco de Juárez',
          'Ahuacuotzingo',
          'Ajuchitlán del Progreso',
          'Alcozauca de Guerrero',
          'Alpoyeca',
          'Apaxtla',
          'Arcelia',
          'Atenango del Río',
          'Atlamajalcingo del Monte',
          'Atlixtac',
          'Atoyac de Álvarez',
          'Ayutla de los Libres',
          'Azoyú',
          'Benito Juárez',
          'Buenavista de Cuéllar',
          'Coahuayutla de José María Izazaga',
          'Cocula',
          'Copala',
          'Copalillo',
          'Copanatoyac',
          'Coyuca de Benítez',
          'Coyuca de Catalán',
          'Cuajinicuilapa',
          'Cualác',
          'Cuautepec',
          'Cuetzala del Progreso',
          'Cutzamala de Pinzón',
          'Chilapa de Álvarez',
          'Chilpancingo de los Bravo',
          'Florencio Villarreal',
          'General Canuto A. Neri',
          'General Heliodoro Castillo',
          'Huamuxtitlán',
          'Huitzuco de los Figueroa',
          'Iguala de la Independencia',
          'Igualapa',
          'Ixcateopan de Cuauhtémoc',
          'Zihuatanejo de Azueta',
          'Juan R. Escudero',
          'Leonardo Bravo',
          'Malinaltepec',
          'Mártir de Cuilapan',
          'Metlatónoc',
          'Mochitlán',
          'Olinalá',
          'Ometepec',
          'Pedro Ascencio Alquisiras',
          'Petatlán',
          'Pilcaya',
          'Pungarabato',
          'Quechultenango',
          'San Luis Acatlán',
          'San Marcos',
          'San Miguel Totolapan',
          'Taxco de Alarcón',
          'Tecoanapa',
          'Técpan de Galeana',
          'Teloloapan',
          'Tepecoacuilco de Trujano',
          'Tetipac',
          'Tixtla de Guerrero',
          'Tlacoachistlahuaca',
          'Tlacoapa',
          'Tlalchapa',
          'Tlalixtaquilla de Maldonado',
          'Tlapa de Comonfort',
          'Tlapehuala',
          'La Unión de Isidoro Montes de Oca',
          'Xalpatláhuac',
          'Xochihuehuetlán',
          'Xochistlahuaca',
          'Zapotitlán Tablas',
          'Zirándaro',
          'Zitlala',
          'Eduardo Neri',
          'Acatepec',
          'Marquelia',
          'Cochoapa el Grande',
          'José Joaquín de Herrera',
          'Juchitán',
          'Iliatenco',
          'Las Vigas',
          'Ñuu Savi',
          'Santa Cruz del Rincón',
          'San Nicolás'
        ]
      },
      {
        value: 'Hidalgo',
        text: 'Hidalgo',
        municipios: [
          'Acatlán',
          'Acaxochitlán',
          'Actopan',
          'Agua Blanca de Iturbide',
          'Ajacuba',
          'Alfajayucan',
          'Almoloya',
          'Apan',
          'El Arenal',
          'Atitalaquia',
          'Atlapexco',
          'Atotonilco el Grande',
          'Atotonilco de Tula',
          'Calnali',
          'Cardonal',
          'Cuautepec de Hinojosa',
          'Chapantongo',
          'Chapulhuacán',
          'Chilcuautla',
          'Eloxochitlán',
          'Emiliano Zapata',
          'Epazoyucan',
          'Francisco I. Madero',
          'Huasca de Ocampo',
          'Huautla',
          'Huazalingo',
          'Huehuetla',
          'Huejutla de Reyes',
          'Huichapan',
          'Ixmiquilpan',
          'Jacala de Ledezma',
          'Jaltocán',
          'Juárez Hidalgo',
          'Lolotla',
          'Metepec',
          'San Agustín Metzquititlán',
          'Metztitlán',
          'Mineral del Chico',
          'Mineral del Monte',
          'La Misión',
          'Mixquiahuala de Juárez',
          'Molango de Escamilla',
          'Nicolás Flores',
          'Nopala de Villagrán',
          'Omitlán de Juárez',
          'San Felipe Orizatlán',
          'Pacula',
          'Pachuca de Soto',
          'Pisaflores',
          'Progreso de Obregón',
          'Mineral de la Reforma',
          'San Agustín Tlaxiaca',
          'San Bartolo Tutotepec',
          'San Salvador',
          'Santiago de Anaya',
          'Santiago Tulantepec de Lugo Guerrero',
          'Singuilucan',
          'Tasquillo',
          'Tecozautla',
          'Tenango de Doria',
          'Tepeapulco',
          'Tepehuacán de Guerrero',
          'Tepeji del Río de Ocampo',
          'Tepetitlán',
          'Tetepango',
          'Villa de Tezontepec',
          'Tezontepec de Aldama',
          'Tianguistengo',
          'Tizayuca',
          'Tlahuelilpan',
          'Tlahuiltepa',
          'Tlanalapa',
          'Tlanchinol',
          'Tlaxcoapan',
          'Tolcayuca',
          'Tula de Allende',
          'Tulancingo de Bravo',
          'Xochiatipan',
          'Xochicoatlán',
          'Yahualica',
          'Zacualtipán de Ángeles',
          'Zapotlán de Juárez',
          'Zempoala',
          'Zimapán'
        ]
      },
      {
        value: 'Jalisco',
        text: 'Jalisco',
        municipios: [
          'Acatic',
          'Acatlán de Juárez',
          'Ahualulco de Mercado',
          'Amacueca',
          'Amatitán',
          'Ameca',
          'San Juanito de Escobedo',
          'Arandas',
          'El Arenal',
          'Atemajac de Brizuela',
          'Atengo',
          'Atenguillo',
          'Atotonilco el Alto',
          'Atoyac',
          'Autlán de Navarro',
          'Ayotlán',
          'Ayutla',
          'La Barca',
          'Bolaños',
          'Cabo Corrientes',
          'Casimiro Castillo',
          'Cihuatlán',
          'Zapotlán el Grande',
          'Cocula',
          'Colotlán',
          'Concepción de Buenos Aires',
          'Cuautitlán de García Barragán',
          'Cuautla',
          'Cuquío',
          'Chapala',
          'Chimaltitán',
          'Chiquilistlán',
          'Degollado',
          'Ejutla',
          'Encarnación de Díaz',
          'Etzatlán',
          'El Grullo',
          'Guachinango',
          'Guadalajara',
          'Hostotipaquillo',
          'Huejúcar',
          'Huejuquilla el Alto',
          'La Huerta',
          'Ixtlahuacán de los Membrillos',
          'Ixtlahuacán del Río',
          'Jalostotitlán',
          'Jamay',
          'Jesús María',
          'Jilotlán de los Dolores',
          'Jocotepec',
          'Juanacatlán',
          'Juchitlán',
          'Lagos de Moreno',
          'El Limón',
          'Magdalena',
          'Santa María del Oro',
          'La Manzanilla de la Paz',
          'Mascota',
          'Mazamitla',
          'Mexticacán',
          'Mezquitic',
          'Mixtlán',
          'Ocotlán',
          'Ojuelos de Jalisco',
          'Pihuamo',
          'Poncitlán',
          'Puerto Vallarta',
          'Villa Purificación',
          'Quitupan',
          'El Salto',
          'San Cristóbal de la Barranca',
          'San Diego de Alejandría',
          'San Juan de los Lagos',
          'San Julián',
          'San Marcos',
          'San Martín de Bolaños',
          'San Martín Hidalgo',
          'San Miguel el Alto',
          'Gómez Farías',
          'San Sebastián del Oeste',
          'Santa María de los Ángeles',
          'Sayula',
          'Tala',
          'Talpa de Allende',
          'Tamazula de Gordiano',
          'Tapalpa',
          'Tecalitlán',
          'Techaluta de Montenegro',
          'Tecolotlán',
          'Tenamaxtlán',
          'Teocaltiche',
          'Teocuitatlán de Corona',
          'Tepatitlán de Morelos',
          'Tequila',
          'Teuchitlán',
          'Tizapán el Alto',
          'Tlajomulco de Zúñiga',
          'San Pedro Tlaquepaque',
          'Tolimán',
          'Tomatlán',
          'Tonalá',
          'Tonaya',
          'Tonila',
          'Totatiche',
          'Tototlán',
          'Tuxcacuesco',
          'Tuxcueca',
          'Tuxpan',
          'Unión de San Antonio',
          'Unión de Tula',
          'Valle de Guadalupe',
          'Valle de Juárez',
          'San Gabriel',
          'Villa Corona',
          'Villa Guerrero',
          'Villa Hidalgo',
          'Cañadas de Obregón',
          'Yahualica de González Gallo',
          'Zacoalco de Torres',
          'Zapopan',
          'Zapotiltic',
          'Zapotitlán de Vadillo',
          'Zapotlán del Rey',
          'Zapotlanejo',
          'San Ignacio Cerro Gordo'
        ]
      },
      {
        value: 'Estado de México',
        text: 'Estado de México',
        municipios: [
          'Acambay de Ruíz Castañeda',
          'Acolman',
          'Aculco',
          'Almoloya de Alquisiras',
          'Almoloya de Juárez',
          'Almoloya del Río',
          'Amanalco',
          'Amatepec',
          'Amecameca',
          'Apaxco',
          'Atenco',
          'Atizapán',
          'Atizapán de Zaragoza',
          'Atlacomulco',
          'Atlautla',
          'Axapusco',
          'Ayapango',
          'Calimaya',
          'Capulhuac',
          'Coacalco de Berriozábal',
          'Coatepec Harinas',
          'Cocotitlán',
          'Coyotepec',
          'Cuautitlán',
          'Chalco',
          'Chapa de Mota',
          'Chapultepec',
          'Chiautla',
          'Chicoloapan',
          'Chiconcuac',
          'Chimalhuacán',
          'Donato Guerra',
          'Ecatepec de Morelos',
          'Ecatzingo',
          'Huehuetoca',
          'Hueypoxtla',
          'Huixquilucan',
          'Isidro Fabela',
          'Ixtapaluca',
          'Ixtapan de la Sal',
          'Ixtapan del Oro',
          'Ixtlahuaca',
          'Xalatlaco',
          'Jaltenco',
          'Jilotepec',
          'Jilotzingo',
          'Jiquipilco',
          'Jocotitlán',
          'Joquicingo',
          'Juchitepec',
          'Lerma',
          'Malinalco',
          'Melchor Ocampo',
          'Metepec',
          'Mexicaltzingo',
          'Morelos',
          'Naucalpan de Juárez',
          'Nezahualcóyotl',
          'Nextlalpan',
          'Nicolás Romero',
          'Nopaltepec',
          'Ocoyoacac',
          'Ocuilan',
          'El Oro',
          'Otumba',
          'Otzoloapan',
          'Otzolotepec',
          'Ozumba',
          'Papalotla',
          'La Paz',
          'Polotitlán',
          'Rayón',
          'San Antonio la Isla',
          'San Felipe del Progreso',
          'San Martín de las Pirámides',
          'San Mateo Atenco',
          'San Simón de Guerrero',
          'Santo Tomás',
          'Soyaniquilpan de Juárez',
          'Sultepec',
          'Tecámac',
          'Tejupilco',
          'Temamatla',
          'Temascalapa',
          'Temascalcingo',
          'Temascaltepec',
          'Temoaya',
          'Tenancingo',
          'Tenango del Aire',
          'Tenango del Valle',
          'Teoloyucan',
          'Teotihuacán',
          'Tepetlaoxtoc',
          'Tepetlixpa',
          'Tepotzotlán',
          'Tequixquiac',
          'Texcaltitlán',
          'Texcalyacac',
          'Texcoco',
          'Tezoyuca',
          'Tianguistenco',
          'Timilpan',
          'Tlalmanalco',
          'Tlalnepantla de Baz',
          'Tlatlaya',
          'Toluca',
          'Tonatico',
          'Tultepec',
          'Tultitlán',
          'Valle de Bravo',
          'Villa de Allende',
          'Villa del Carbón',
          'Villa Guerrero',
          'Villa Victoria',
          'Xonacatlán',
          'Zacazonapan',
          'Zacualpan',
          'Zinacantepec',
          'Zumpahuacán',
          'Zumpango',
          'Cuautitlán Izcalli',
          'Valle de Chalco Solidaridad',
          'Luvianos',
          'San José del Rincón',
          'Tonanitla'
        ]
      },
      {
        value: 'Michoacán',
        text: 'Michoacán',
        municipios: [
          'Acuitzio',
          'Aguililla',
          'Álvaro Obregón',
          'Angamacutiro',
          'Angangueo',
          'Apatzingán',
          'Aporo',
          'Aquila',
          'Ario',
          'Arteaga',
          'Briseñas',
          'Buenavista',
          'Carácuaro',
          'Coahuayana',
          'Coalcomán de Vázquez Pallares',
          'Coeneo',
          'Contepec',
          'Copándaro',
          'Cotija',
          'Cuitzeo',
          'Charapan',
          'Charo',
          'Chavinda',
          'Cherán',
          'Chilchota',
          'Chinicuila',
          'Chucándiro',
          'Churintzio',
          'Churumuco',
          'Ecuandureo',
          'Epitacio Huerta',
          'Erongarícuaro',
          'Gabriel Zamora',
          'Hidalgo',
          'La Huacana',
          'Huandacareo',
          'Huaniqueo',
          'Huetamo',
          'Huiramba',
          'Indaparapeo',
          'Irimbo',
          'Ixtlán',
          'Jacona',
          'Jiménez',
          'Jiquilpan',
          'Juárez',
          'Jungapeo',
          'Lagunillas',
          'Madero',
          'Maravatío',
          'Marcos Castellanos',
          'Lázaro Cárdenas',
          'Morelia',
          'Morelos',
          'Múgica',
          'Nahuatzen',
          'Nocupétaro',
          'Nuevo Parangaricutiro',
          'Nuevo Urecho',
          'Numarán',
          'Ocampo',
          'Pajacuarán',
          'Panindícuaro',
          'Parácuaro',
          'Paracho',
          'Pátzcuaro',
          'Penjamillo',
          'Peribán',
          'La Piedad',
          'Purépero',
          'Puruándiro',
          'Queréndaro',
          'Quiroga',
          'Cojumatlán de Régules',
          'Los Reyes',
          'Sahuayo',
          'San Lucas',
          'Santa Ana Maya',
          'Salvador Escalante',
          'Senguio',
          'Susupuato',
          'Tacámbaro',
          'Tancítaro',
          'Tangamandapio',
          'Tangancícuaro',
          'Tanhuato',
          'Taretan',
          'Tarímbaro',
          'Tepalcatepec',
          'Tingambato',
          'Tingüindín',
          'Tiquicheo de Nicolás Romero',
          'Tlalpujahua',
          'Tlazazalca',
          'Tocumbo',
          'Tumbiscatío',
          'Turicato',
          'Tuxpan',
          'Tuzantla',
          'Tzintzuntzan',
          'Tzitzio',
          'Uruapan',
          'Venustiano Carranza',
          'Villamar',
          'Vista Hermosa',
          'Yurécuaro',
          'Zacapu',
          'Zamora',
          'Zináparo',
          'Zinapécuaro',
          'Ziracuaretiro',
          'Zitácuaro',
          'José Sixto Verduzco'
        ]
      },
      {
        value: 'Morelos',
        text: 'Morelos',
        municipios: [
          'Amacuzac',
          'Atlatlahucan',
          'Axochiapan',
          'Ayala',
          'Coatlán del Río',
          'Cuautla',
          'Cuernavaca',
          'Emiliano Zapata',
          'Huitzilac',
          'Jantetelco',
          'Jiutepec',
          'Jojutla',
          'Jonacatepec de Leandro Valle',
          'Mazatepec',
          'Miacatlán',
          'Ocuituco',
          'Puente de Ixtla',
          'Temixco',
          'Tepalcingo',
          'Tepoztlán',
          'Tetecala',
          'Tetela del Volcán',
          'Tlalnepantla',
          'Tlaltizapán de Zapata',
          'Tlaquiltenango',
          'Tlayacapan',
          'Totolapan',
          'Xochitepec',
          'Yautepec',
          'Yecapixtla',
          'Zacatepec',
          'Zacualpan de Amilpas',
          'Temoac',
          'Coatetelco',
          'Xoxocotla',
          'Hueyapan'
        ]
      },
      {
        value: 'Nayarit',
        text: 'Nayarit',
        municipios: [
          'Acaponeta',
          'Ahuacatlán',
          'Amatlán de Cañas',
          'Compostela',
          'Huajicori',
          'Ixtlán del Río',
          'Jala',
          'Xalisco',
          'Del Nayar',
          'Rosamorada',
          'Ruíz',
          'San Blas',
          'San Pedro Lagunillas',
          'Santa María del Oro',
          'Santiago Ixcuintla',
          'Tecuala',
          'Tepic',
          'Tuxpan',
          'La Yesca',
          'Bahía de Banderas'
        ]
      },
      {
        value: 'Nuevo León',
        text: 'Nuevo León',
        municipios: [
          'Abasolo',
          'Agualeguas',
          'Los Aldamas',
          'Allende',
          'Anáhuac',
          'Apodaca',
          'Aramberri',
          'Bustamante',
          'Cadereyta Jiménez',
          'El Carmen',
          'Cerralvo',
          'Ciénega de Flores',
          'China',
          'Doctor Arroyo',
          'Doctor Coss',
          'Doctor González',
          'Galeana',
          'García',
          'San Pedro Garza García',
          'General Bravo',
          'General Escobedo',
          'General Terán',
          'General Treviño',
          'General Zaragoza',
          'General Zuazua',
          'Guadalupe',
          'Los Herreras',
          'Higueras',
          'Hualahuises',
          'Iturbide',
          'Juárez',
          'Lampazos de Naranjo',
          'Linares',
          'Marín',
          'Melchor Ocampo',
          'Mier y Noriega',
          'Mina',
          'Montemorelos',
          'Monterrey',
          'Parás',
          'Pesquería',
          'Los Ramones',
          'Rayones',
          'Sabinas Hidalgo',
          'Salinas Victoria',
          'San Nicolás de los Garza',
          'Hidalgo',
          'Santa Catarina',
          'Santiago',
          'Vallecillo',
          'Villaldama'
        ]
      },
      {
        value: 'Oaxaca',
        text: 'Oaxaca',
        municipios: [
          'Abejones',
          'Acatlán de Pérez Figueroa',
          'Asunción Cacalotepec',
          'Asunción Cuyotepeji',
          'Asunción Ixtaltepec',
          'Asunción Nochixtlán',
          'Asunción Ocotlán',
          'Asunción Tlacolulita',
          'Ayotzintepec',
          'El Barrio de la Soledad',
          'Calihualá',
          'Candelaria Loxicha',
          'Ciénega de Zimatlán',
          'Ciudad Ixtepec',
          'Coatecas Altas',
          'Coicoyán de las Flores',
          'La Compañía',
          'Concepción Buenavista',
          'Concepción Pápalo',
          'Constancia del Rosario',
          'Cosolapa',
          'Cosoltepec',
          'Cuilápam de Guerrero',
          'Cuyamecalco Villa de Zaragoza',
          'Chahuites',
          'Chalcatongo de Hidalgo',
          'Chiquihuitlán de Benito Juárez',
          'Heroica Ciudad de Ejutla de Crespo',
          'Eloxochitlán de Flores Magón',
          'El Espinal',
          'Tamazulápam del Espíritu Santo',
          'Fresnillo de Trujano',
          'Guadalupe Etla',
          'Guadalupe de Ramírez',
          'Guelatao de Juárez',
          'Guevea de Humboldt',
          'Mesones Hidalgo',
          'Villa Hidalgo',
          'Heroica Ciudad de Huajuapan de León',
          'Huautepec',
          'Huautla de Jiménez',
          'Ixtlán de Juárez',
          'Juchitán de Zaragoza',
          'Loma Bonita',
          'Magdalena Apasco',
          'Magdalena Jaltepec',
          'Santa Magdalena Jicotlán',
          'Magdalena Mixtepec',
          'Magdalena Ocotlán',
          'Magdalena Peñasco',
          'Magdalena Teitipac',
          'Magdalena Tequisistlán',
          'Magdalena Tlacotepec',
          'Magdalena Zahuatlán',
          'Mariscala de Juárez',
          'Mártires de Tacubaya',
          'Matías Romero Avendaño',
          'Mazatlán Villa de Flores',
          'Miahuatlán de Porfirio Díaz',
          'Mixistlán de la Reforma',
          'Monjas',
          'Natividad',
          'Nazareno Etla',
          'Nejapa de Madero',
          'Ixpantepec Nieves',
          'Santiago Niltepec',
          'Oaxaca de Juárez',
          'Ocotlán de Morelos',
          'La Pe',
          'Pinotepa de Don Luis',
          'Pluma Hidalgo',
          'San José del Progreso',
          'Putla Villa de Guerrero',
          'Santa Catarina Quioquitani',
          'Reforma de Pineda',
          'La Reforma',
          'Reyes Etla',
          'Rojas de Cuauhtémoc',
          'Salina Cruz',
          'San Agustín Amatengo',
          'San Agustín Atenango',
          'San Agustín Chayuco',
          'San Agustín de las Juntas',
          'San Agustín Etla',
          'San Agustín Loxicha',
          'San Agustín Tlacotepec',
          'San Agustín Yatareni',
          'San Andrés Cabecera Nueva',
          'San Andrés Dinicuiti',
          'San Andrés Huaxpaltepec',
          'San Andrés Huayápam',
          'San Andrés Ixtlahuaca',
          'San Andrés Lagunas',
          'San Andrés Nuxiño',
          'San Andrés Paxtlán',
          'San Andrés Sinaxtla',
          'San Andrés Solaga',
          'San Andrés Teotilálpam',
          'San Andrés Tepetlapa',
          'San Andrés Yaá'
        ]
      },
      {
        value: 'Puebla',
        text: 'Puebla',
        municipios: [
          'Acajete',
          'Acateno',
          'Acatlán',
          'Acatzingo',
          'Acteopan',
          'Ahuacatlán',
          'Ahuatlán',
          'Ahuazotepec',
          'Ahuehuetitla',
          'Ajalpan',
          'Albino Zertuche',
          'Aljojuca',
          'Altepexi',
          'Amixtlán',
          'Amozoc',
          'Aquixtla',
          'Atempan',
          'Atexcal',
          'Atlixco',
          'Atoyatempan',
          'Atzala',
          'Atzitzihuacán',
          'Atzitzintla',
          'Axutla',
          'Ayotoxco de Guerrero',
          'Calpan',
          'Caltepec',
          'Camocuautla',
          'Caxhuacan',
          'Coatepec',
          'Coatzingo',
          'Cohetzala',
          'Cohuecan',
          'Coronango',
          'Coxcatlán',
          'Coyomeapan',
          'Coyotepec',
          'Cuapiaxtla de Madero',
          'Cuautempan',
          'Cuautinchán',
          'Cuautlancingo',
          'Cuayuca de Andrade',
          'Cuetzalan del Progreso',
          'Cuyoaco',
          'Chalchicomula de Sesma',
          'Chapulco',
          'Chiautla',
          'Chiautzingo',
          'Chiconcuautla',
          'Chichiquila',
          'Chietla',
          'Chigmecatitlán',
          'Chignahuapan',
          'Chignautla',
          'Chila',
          'Chila de la Sal',
          'Honey',
          'Chilchotla',
          'Chinantla',
          'Domingo Arenas',
          'Eloxochitlán',
          'Epatlán',
          'Esperanza',
          'Francisco Z. Mena',
          'General Felipe Ángeles',
          'Guadalupe',
          'Guadalupe Victoria',
          'Hermenegildo Galeana',
          'Huaquechula',
          'Huatlatlauca',
          'Huauchinango',
          'Huehuetla',
          'Huehuetlán el Chico',
          'Huejotzingo',
          'Hueyapan',
          'Hueytamalco',
          'Hueytlalpan',
          'Huitzilan de Serdán',
          'Huitziltepec',
          'Atlequizayan',
          'Ixcamilpa de Guerrero',
          'Ixcaquixtla',
          'Ixtacamaxtitlán',
          'Ixtepec',
          'Izúcar de Matamoros',
          'Jalpan',
          'Jolalpan',
          'Jonotla',
          'Jopala',
          'Juan C. Bonilla',
          'Juan Galindo',
          'Juan N. Méndez',
          'Lafragua',
          'Libres',
          'La Magdalena Tlatlauquitepec',
          'Mazapiltepec de Juárez',
          'Mixtla',
          'Molcaxac',
          'Cañada Morelos',
          'Naupan'
        ]
      },
  ];
  

  public status_options = [
    {
      value: 'Soltero/a',
      text: 'Soltero/a',
    },
    {
      value: 'Casado/a',
      text: 'Casado/a',
    },
    {
      value: 'Divorciado/a',
      text: 'Divorciado/a',
    },
    {
      value: 'Separado/a en proceso judicial',
      text: 'Separado/a en proceso judicial',
    },
    {
      value: 'Viudo/a',
      text: 'Viudo/a',
    },
    {
      value: 'Concubinato',
      text: 'Concubinato',
    },
  ];

  public parentescos_options = [
    { value: 'padre', text: 'Padre' },
    { value: 'madre', text: 'Madre' },
    { value: 'hijo', text: 'Hijo' },
    { value: 'hija', text: 'Hija' },
    { value: 'abuelo', text: 'Abuelo' },
    { value: 'abuela', text: 'Abuela' },
    { value: 'hermano', text: 'Hermano' },
    { value: 'hermana', text: 'Hermana' },
    { value: 'tío', text: 'Tío' },
    { value: 'tía', text: 'Tía' },
    { value: 'primo', text: 'Primo' },
    { value: 'prima', text: 'Prima' },
    { value: 'sobrino', text: 'Sobrino' },
    { value: 'sobrina', text: 'Sobrina' },
    { value: 'esposo', text: 'Esposo' },
    { value: 'esposa', text: 'Esposa' },
    { value: 'novio', text: 'Novio' },
    { value: 'novia', text: 'Novia' },
  ];


  public showPacienteInfoTab: boolean = true;
  public showAntecedentesInfoTab: boolean = false;
  public showAparatosInfoTab: boolean = false;
  public showExploracionInfoTab: boolean = false;
  public showAutorizacionInfoTab: boolean = false;
  public showDiagnosticosInfoTab: boolean = false;


  public showDigestivoOtroTextarea: boolean = false;
  public showRespiratorioOtroTextarea: boolean = false;
  public showCirculatorioOtroTextarea: boolean = false;
  public showGenitoUrinarioOtroTextarea: boolean = false;
  public showSistNerviosoOtroTextarea: boolean = false;
  public showSintomasGeneralesOtroTextarea: boolean = false;

  public historiaClinicaForm = this.formBuilder.group({
    //INFORMACION GENERAL DEL PACIENTE
    nombre_tutor:[''],
    nombre_completo: ['', Validators.required],
    fecha_de_nacimiento: ['', Validators.required],
    genero: ['', Validators.required],
    estado_civil: ['', Validators.required],
    ocupacion: ['', Validators.required],
    domicilio: ['', Validators.required],
    telefono: ['', Validators.required],
    ciudad_origen: ['', Validators.required],
    estado_origen: ['', Validators.required],
    pais_origen: ['', Validators.required],
    ciudad_Actual: ['', Validators.required],
    nombre_contacto_emergencia: ['', Validators.required],
    parentesco_contacto_emergencia: ['', Validators.required],
    telefono_contacto_emergencia: ['', Validators.required],
    //ANTECEDENTES
    antecedentes_hereditarios: [],
    alcoholismo: [],
    tabaquismo: [],
    toxicomanias: [],
    higiene: [],
    alimentacion: [],
    condicion : [],
    socioconomia: [],
    habitos: [],
    ant_personales_otros_textarea: [''],
    //
    enf_infancia: [],
    Fimicos: [], 
    Lueticos: [],
    Diabeticos: [],
    Quirurgicos: [],
    Traumaticos: [],
    Ictericos: [],
    Epilepticos: [],
    Alergicos: [],
    Reumaticos: [],
    Transfusiones: [],
    Enfermedades_Cardiovasculares: [],
    Incidencia_de_Infecciones_Bucales: [],
    Neoplasticas: [],
    SIDA: [],
    ant_personales_p_otros_textarea: [''],
    padecimiento_principio: [''],
    padecimiento_evolucion: [''],
    padecimiento_estado_actual: [''],
     
    //DIGESTIVO
    aparatos_sistemas_digestivo_apetito: [],
    aparatos_sistemas_digestivo_Masticacion: [],
    aparatos_sistemas_digestivo_Deglucion: [],
    aparatos_sistemas_digestivo_Disfagia: [],
    aparatos_sistemas_digestivo_Nauseas: [],
    aparatos_sistemas_digestivo_Vomito: [],
    aparatos_sistemas_digestivo_Dolor_Abdominal: [],
    aparatos_sistemas_digestivo_Hematemsis: [],
    aparatos_sistemas_digestivo_Pirosis: [],
    aparatos_sistemas_digestivo_Meteorismo: [],
    aparatos_sistemas_digestivo_Diarrea: [],
    aparatos_sistemas_digestivo_Estrenimiento: [],
    aparatos_sistemas_digestivo_Melena: [],
    aparatos_sistemas_digestivo_Rectorragia: [],
    aparatos_sistemas_digestivo_Otros: [],
    aparatos_sistemas_digestivo_Otros_textarea: [],
    //SISTEMAS RESPIRATOIROS
    aparatos_sistemas_respiratorio_Epistasis: [],
    aparatos_sistemas_respiratorio_Tos: [],
    aparatos_sistemas_respiratorio_Disnea: [],
    aparatos_sistemas_respiratorio_Expectoracion: [],
    aparatos_sistemas_respiratorio_Asma: [],
    aparatos_sistemas_respiratorio_Dolor_al_respirar: [],
    aparatos_sistemas_respiratorio_Disfonia: [],
    aparatos_sistemas_respiratorio_Gripa_frecuente: [],
    aparatos_sistemas_respiratorio_Otros: [],
    aparatos_sistemas_respiratorio_Otros_textarea: [],
    // CIRCULATORIO
    aparatos_sistemas_circulatorio_Disnea_del_esfuerzo: [],
    aparatos_sistemas_circulatorio_Dolor_retroesternal: [],
    aparatos_sistemas_circulatorio_Palpitaciones: [],
    aparatos_sistemas_circulatorio_Edema: [],
    aparatos_sistemas_circulatorio_Lipotimias: [],
    aparatos_sistemas_circulatorio_Calambres: [],
    aparatos_sistemas_circulatorio_Cianosis: [],
    aparatos_sistemas_circulatorio_Acufenos: [],
    aparatos_sistemas_circulatorio_Fosfenos: [],
    aparatos_sistemas_circulatorio_Otros: [],
    aparatos_sistemas_circulatorio_Otros_textarea: [],
    //GENITO URINARIO
    aparatos_sistemas_genito_urinario_Frecuencia_de_micciones: [],
    aparatos_sistemas_genito_urinario_Color: [],
    aparatos_sistemas_genito_urinario_Diuria: [],
    aparatos_sistemas_genito_urinario_Nicturia: [],
    aparatos_sistemas_genito_urinario_Hematuria: [],
    aparatos_sistemas_genito_urinario_Poliuria: [],
    aparatos_sistemas_genito_urinario_Otros: [],
    aparatos_sistemas_genito_urinario_Otros_textarea: [],
    // SISTEMA NERVIOSO
    aparatos_sistemas_sist_nervioso_Ansiedad: [],
    aparatos_sistemas_sist_nervioso_Temor: [],
    aparatos_sistemas_sist_nervioso_Convulciones: [],
    aparatos_sistemas_sist_nervioso_Paralisis: [],
    aparatos_sistemas_sist_nervioso_Temblores: [],
    aparatos_sistemas_sist_nervioso_Tics: [],
    aparatos_sistemas_sist_nervioso_Vista: [],
    aparatos_sistemas_sist_nervioso_Oido: [],
    aparatos_sistemas_sist_nervioso_Tacto: [],
    aparatos_sistemas_sist_nervioso_Otros: [],
    aparatos_sistemas_sist_nervioso_Otros_textarea: [],
    // SINTOMAS GENERALES
    aparatos_sistemas_sintomas_generales_Variacion_de_peso: [],
    aparatos_sistemas_sintomas_generales_Astenia: [],
    aparatos_sistemas_sintomas_generales_Adinamia: [],
    aparatos_sistemas_sintomas_generales_Fiebre: [],
    aparatos_sistemas_sintomas_generales_Escalofrios: [],
    aparatos_sistemas_sintomas_generales_Cambio_de_coloracaion_en_piel_y_mucosa: [],
    aparatos_sistemas_sintomas_generales_Anorexia: [],
    aparatos_sistemas_sintomas_generales_otros: [],
    aparatos_sistemas_sintomas_generales_otros_textarea: [],
    //EXPLORACION FISICA HABITUS EXTERIOR
    exploracion_fisica_raza_sexo_edad_facies_estado_conciencia: [],
    exploracion_fisica_actitud_constitucion_marcha_movimientos_anormales: [],
    exploracion_fisica_signos_vitales: [],
    exploracion_fisica_TA: [],
    exploracion_fisica_frec_respiratoria: [],
    exploracion_fisica_temperatura: [],
    exploracion_fisica_peso: [],
  });


  //ENFERMEDADES
  public esDiabetico: boolean = false;
  public esAlcoholico: boolean = false;
  public esFumador: boolean = false;
  public esEpileptico: boolean = false;
  public esReumatico: boolean = false;
  public esAlergico: boolean = false;

  public estudianteData:any = {}

  public isAprobadoAnyConsulta:boolean = true;
  public isFirmadaAutorizacion:boolean = false;

  public historia_clinica_id:any = ''
  constructor(
    private formBuilder: FormBuilder,
    private apiSevice: ApiService,
    private _general: GeneralService,
    private _route: ActivatedRoute,
    private _perfil_estudiante: PerfilEstudiantesService,
    private _asignaturas:asignaturaService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    let user:any = localStorage.getItem("user")
    user = JSON.parse(user)
    this.usuarioLogeado = user;

    this._route.params.subscribe((param) => {
      this.historia_clinica_id = param['id']
      if(this.historia_clinica_id){
        this.apiSevice.getHistoriaClinica(this.historia_clinica_id).subscribe(
          (response: any) => {
            this.isFirmadaAutorizacion = response?.item?.historia_clinica?.isFirmadaAutorizacion ? response?.item?.historia_clinica?.isFirmadaAutorizacion : false
           this.historiaClinicaForm.get("nombre_completo")?.setValue(response?.item?.paciente?.nombre_completo)
           /*Valor de la fecha de nacimiento*/ 
           const fechaNacimiento = response?.item?.paciente?.fecha_de_nacimiento;
           const edad= this.calcularEdad(fechaNacimiento);
          
           if(edad!=-1){
            this.isEditHistoria = true;
            if (edad < 18) {
              this.esMayorDeEdad =false;
              this.esMenordeEdad = true;
            } else{
              this.esMayorDeEdad = true;
              this.esMenordeEdad = false;
            }
          }else{
            this.esMayorDeEdad=false;
            this.esMenordeEdad = false;
          }

            if(this.isEditHistoria){
              this.firmaImagenShow = response?.item?.historia_clinica?.firmaPaciente
              this.firmaImagen = response?.item?.historia_clinica?.firmaPaciente
            }
           this.historiaClinicaForm.get("fecha_de_nacimiento")?.setValue(response?.item?.paciente?.fecha_de_nacimiento)
           this.historiaClinicaForm.get('nombre_tutor')?.setValue(response?.item?.historia_clinica?.nombre_tutor)
           this.historiaClinicaForm.get("genero")?.setValue(response?.item?.paciente?.genero)
           this.historiaClinicaForm.get("estado_civil")?.setValue(response?.item?.paciente?.estado_civil)
           this.historiaClinicaForm.get("ocupacion")?.setValue(response?.item?.paciente?.ocupacion)
           this.historiaClinicaForm.get("domicilio")?.setValue(response?.item?.paciente?.domicilio)
           this.historiaClinicaForm.get("telefono")?.setValue(response?.item?.paciente?.telefono)
           this.historiaClinicaForm.get("ciudad_origen")?.setValue(response?.item?.paciente?.ciudad_origen)
           this.historiaClinicaForm.get("estado_origen")?.setValue(response?.item?.paciente?.estado_origen)
           this.historiaClinicaForm.get("pais_origen")?.setValue(response?.item?.paciente?.pais_origen)
           this.historiaClinicaForm.get("ciudad_Actual")?.setValue(response?.item?.paciente?.ciudad_Actual)
           this.historiaClinicaForm.get("nombre_contacto_emergencia")?.setValue(response?.item?.paciente?.nombre_contacto_emergencia)
           this.historiaClinicaForm.get("parentesco_contacto_emergencia")?.setValue(response?.item?.paciente?.parentesco_contacto_emergencia)
           this.historiaClinicaForm.get("telefono_contacto_emergencia")?.setValue(response?.item?.paciente?.telefono_contacto_emergencia)

           this.historiaClinicaForm.get("antecedentes_hereditarios")?.setValue(response?.item?.historia_clinica?.antecedentes_hereditarios)
           this.historiaClinicaForm.get("alcoholismo")?.setValue(response?.item?.historia_clinica?.alcoholismo)
           if(response?.item?.historia_clinica?.alcoholismo){
            this.esAlcoholico
           }
           if(response?.item?.historia_clinica?.tabaquismo){
            this.esFumador
           }
           if(response?.item?.historia_clinica?.Diabeticos){
            this.esDiabetico
           }
           if(response?.item?.historia_clinica?.Alergicos){
            this.esAlergico
           }
           if(response?.item?.historia_clinica?.Reumaticos){
            this.esReumatico
           }
           if(response?.item?.historia_clinica?.Epilepticos){
            this.esEpileptico
           }
           
           this.historiaClinicaForm.get("tabaquismo")?.setValue(response?.item?.historia_clinica?.tabaquismo)
           this.historiaClinicaForm.get("toxicomanias")?.setValue(response?.item?.historia_clinica?.toxicomanias)
           this.historiaClinicaForm.get("higiene")?.setValue(response?.item?.historia_clinica?.higiene)
           this.historiaClinicaForm.get("alimentacion")?.setValue(response?.item?.historia_clinica?.alimentacion)
           this.historiaClinicaForm.get("condicion")?.setValue(response?.item?.historia_clinica?.condicion)
           this.historiaClinicaForm.get("socioconomia")?.setValue(response?.item?.historia_clinica?.socioconomia)
           this.historiaClinicaForm.get("habitos")?.setValue(response?.item?.historia_clinica?.habitos)
           this.historiaClinicaForm.get("ant_personales_otros_textarea")?.setValue(response?.item?.historia_clinica?.ant_personales_otros_textarea)
           this.historiaClinicaForm.get("padecimiento_principio")?.setValue(response?.item?.historia_clinica?.padecimiento_principio)
           this.historiaClinicaForm.get("padecimiento_evolucion")?.setValue(response?.item?.historia_clinica?.padecimiento_evolucion)
           this.historiaClinicaForm.get("padecimiento_estado_actual")?.setValue(response?.item?.historia_clinica?.padecimiento_estado_actual)
           this.historiaClinicaForm.get("ant_personales_p_otros_textarea")?.setValue(response?.item?.historia_clinica?.ant_personales_p_otros_textarea)
           
           this.historiaClinicaForm.get("enf_infancia")?.setValue(response?.item?.historia_clinica?.enf_infancia)
           this.historiaClinicaForm.get("Fimicos")?.setValue(response?.item?.historia_clinica?.Fimicos)
           this.historiaClinicaForm.get("Lueticos")?.setValue(response?.item?.historia_clinica?.Lueticos)
           this.historiaClinicaForm.get("Diabeticos")?.setValue(response?.item?.historia_clinica?.Diabeticos)
           this.historiaClinicaForm.get("Quirurgicos")?.setValue(response?.item?.historia_clinica?.Quirurgicos)
           this.historiaClinicaForm.get("Traumaticos")?.setValue(response?.item?.historia_clinica?.Traumaticos)
           this.historiaClinicaForm.get("Ictericos")?.setValue(response?.item?.historia_clinica?.Ictericos)
           this.historiaClinicaForm.get("Epilepticos")?.setValue(response?.item?.historia_clinica?.Epilepticos)
           this.historiaClinicaForm.get("Alergicos")?.setValue(response?.item?.historia_clinica?.Alergicos)
           this.historiaClinicaForm.get("Reumaticos")?.setValue(response?.item?.historia_clinica?.Reumaticos)
           this.historiaClinicaForm.get("Transfusiones")?.setValue(response?.item?.historia_clinica?.Transfusiones)
           this.historiaClinicaForm.get("Enfermedades_Cardiovasculares")?.setValue(response?.item?.historia_clinica?.Enfermedades_Cardiovasculares)
           this.historiaClinicaForm.get("Incidencia_de_Infecciones_Bucales")?.setValue(response?.item?.historia_clinica?.Incidencia_de_Infecciones_Bucales)
           this.historiaClinicaForm.get("Neoplasticas")?.setValue(response?.item?.historia_clinica?.Neoplasticas)
           this.historiaClinicaForm.get("SIDA")?.setValue(response?.item?.historia_clinica?.SIDA)
          

           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_apetito")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_apetito)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Masticacion")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Masticacion)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Deglucion")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Deglucion)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Disfagia")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Disfagia)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Nauseas")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Nauseas)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Vomito")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Vomito)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Dolor_Abdominal")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Dolor_Abdominal)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Hematemsis")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Hematemsis)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Pirosis")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Pirosis)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Meteorismo")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Meteorismo)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Diarrea")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Diarrea)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Estrenimiento")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Estrenimiento)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Melena")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Melena)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Rectorragia")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Rectorragia)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Otros")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Otros)
           this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Otros_textarea")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_digestivo_Otros_textarea)
           this.historiaClinicaForm.get("aparatos_sistemas_respiratorio_Epistasis")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_respiratorio_Epistasis)
           this.historiaClinicaForm.get("aparatos_sistemas_respiratorio_Tos")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_respiratorio_Tos)
           this.historiaClinicaForm.get("aparatos_sistemas_respiratorio_Disnea")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_respiratorio_Disnea)
           this.historiaClinicaForm.get("aparatos_sistemas_respiratorio_Expectoracion")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_respiratorio_Expectoracion)
           this.historiaClinicaForm.get("aparatos_sistemas_respiratorio_Asma")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_respiratorio_Asma)
           this.historiaClinicaForm.get("aparatos_sistemas_respiratorio_Dolor_al_respirar")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_respiratorio_Dolor_al_respirar)
           this.historiaClinicaForm.get("aparatos_sistemas_respiratorio_Disfonia")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_respiratorio_Disfonia)
           this.historiaClinicaForm.get("aparatos_sistemas_respiratorio_Gripa_frecuente")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_respiratorio_Gripa_frecuente)
           this.historiaClinicaForm.get("aparatos_sistemas_respiratorio_Otros")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_respiratorio_Otros)
           this.historiaClinicaForm.get("aparatos_sistemas_respiratorio_Otros_textarea")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_respiratorio_Otros_textarea)
           this.historiaClinicaForm.get("aparatos_sistemas_circulatorio_Disnea_del_esfuerzo")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_circulatorio_Disnea_del_esfuerzo)
           this.historiaClinicaForm.get("aparatos_sistemas_circulatorio_Dolor_retroesternal")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_circulatorio_Dolor_retroesternal)
           this.historiaClinicaForm.get("aparatos_sistemas_circulatorio_Palpitaciones")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_circulatorio_Palpitaciones)
           this.historiaClinicaForm.get("aparatos_sistemas_circulatorio_Edema")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_circulatorio_Edema)
           this.historiaClinicaForm.get("aparatos_sistemas_circulatorio_Lipotimias")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_circulatorio_Lipotimias)
           this.historiaClinicaForm.get("aparatos_sistemas_circulatorio_Calambres")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_circulatorio_Calambres)
           this.historiaClinicaForm.get("aparatos_sistemas_circulatorio_Cianosis")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_circulatorio_Cianosis)
           this.historiaClinicaForm.get("aparatos_sistemas_circulatorio_Acufenos")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_circulatorio_Acufenos)
           this.historiaClinicaForm.get("aparatos_sistemas_circulatorio_Fosfenos")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_circulatorio_Fosfenos)
           this.historiaClinicaForm.get("aparatos_sistemas_circulatorio_Otros")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_circulatorio_Otros)
           this.historiaClinicaForm.get("aparatos_sistemas_circulatorio_Otros_textarea")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_circulatorio_Otros_textarea)
           this.historiaClinicaForm.get("aparatos_sistemas_genito_urinario_Frecuencia_de_micciones")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_genito_urinario_Frecuencia_de_micciones)
           this.historiaClinicaForm.get("aparatos_sistemas_genito_urinario_Color")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_genito_urinario_Color)
           this.historiaClinicaForm.get("aparatos_sistemas_genito_urinario_Diuria")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_genito_urinario_Diuria)
           this.historiaClinicaForm.get("aparatos_sistemas_genito_urinario_Nicturia")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_genito_urinario_Nicturia)
           this.historiaClinicaForm.get("aparatos_sistemas_genito_urinario_Hematuria")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_genito_urinario_Hematuria)
           this.historiaClinicaForm.get("aparatos_sistemas_genito_urinario_Poliuria")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_genito_urinario_Poliuria)
           this.historiaClinicaForm.get("aparatos_sistemas_genito_urinario_Otros")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_genito_urinario_Otros)
           this.historiaClinicaForm.get("aparatos_sistemas_genito_urinario_Otros_textarea")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_genito_urinario_Otros_textarea)
           this.historiaClinicaForm.get("aparatos_sistemas_sist_nervioso_Ansiedad")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sist_nervioso_Ansiedad)
           this.historiaClinicaForm.get("aparatos_sistemas_sist_nervioso_Temor")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sist_nervioso_Temor)
           this.historiaClinicaForm.get("aparatos_sistemas_sist_nervioso_Convulciones")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sist_nervioso_Convulciones)
           this.historiaClinicaForm.get("aparatos_sistemas_sist_nervioso_Paralisis")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sist_nervioso_Paralisis)
           this.historiaClinicaForm.get("aparatos_sistemas_sist_nervioso_Temblores")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sist_nervioso_Temblores)
           this.historiaClinicaForm.get("aparatos_sistemas_sist_nervioso_Tics")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sist_nervioso_Tics)
           this.historiaClinicaForm.get("aparatos_sistemas_sist_nervioso_Vista")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sist_nervioso_Vista)
           this.historiaClinicaForm.get("aparatos_sistemas_sist_nervioso_Oido")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sist_nervioso_Oido)
           this.historiaClinicaForm.get("aparatos_sistemas_sist_nervioso_Tacto")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sist_nervioso_Tacto)
           this.historiaClinicaForm.get("aparatos_sistemas_sist_nervioso_Otros")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sist_nervioso_Otros)
           this.historiaClinicaForm.get("aparatos_sistemas_sist_nervioso_Otros_textarea")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sist_nervioso_Otros_textarea)
           this.historiaClinicaForm.get("aparatos_sistemas_sintomas_generales_Variacion_de_peso")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sintomas_generales_Variacion_de_peso)
           this.historiaClinicaForm.get("aparatos_sistemas_sintomas_generales_Astenia")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sintomas_generales_Astenia)
           this.historiaClinicaForm.get("aparatos_sistemas_sintomas_generales_Adinamia")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sintomas_generales_Adinamia)
           this.historiaClinicaForm.get("aparatos_sistemas_sintomas_generales_Fiebre")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sintomas_generales_Fiebre)
           this.historiaClinicaForm.get("aparatos_sistemas_sintomas_generales_Escalofrios")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sintomas_generales_Escalofrios)
           this.historiaClinicaForm.get("aparatos_sistemas_sintomas_generales_Cambio_de_coloracaion_en_piel_y_mucosa")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sintomas_generales_Cambio_de_coloracaion_en_piel_y_mucosa)
           this.historiaClinicaForm.get("aparatos_sistemas_sintomas_generales_Anorexia")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sintomas_generales_Anorexia)
           this.historiaClinicaForm.get("aparatos_sistemas_sintomas_generales_otros")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sintomas_generales_otros)
           this.historiaClinicaForm.get("aparatos_sistemas_sintomas_generales_otros_textarea")?.setValue(response?.item?.historia_clinica?.aparatos_sistemas_sintomas_generales_otros_textarea)
           this.historiaClinicaForm.get("exploracion_fisica_raza_sexo_edad_facies_estado_conciencia")?.setValue(response?.item?.historia_clinica?.exploracion_fisica_raza_sexo_edad_facies_estado_conciencia)
           this.historiaClinicaForm.get("exploracion_fisica_actitud_constitucion_marcha_movimientos_anormales")?.setValue(response?.item?.historia_clinica?.exploracion_fisica_actitud_constitucion_marcha_movimientos_anormales)
           this.historiaClinicaForm.get("exploracion_fisica_signos_vitales")?.setValue(response?.item?.historia_clinica?.exploracion_fisica_signos_vitales)
           this.historiaClinicaForm.get("exploracion_fisica_TA")?.setValue(response?.item?.historia_clinica?.exploracion_fisica_TA)
           this.historiaClinicaForm.get("exploracion_fisica_frec_respiratoria")?.setValue(response?.item?.historia_clinica?.exploracion_fisica_frec_respiratoria)
           this.historiaClinicaForm.get("exploracion_fisica_temperatura")?.setValue(response?.item?.historia_clinica?.exploracion_fisica_temperatura)
           this.historiaClinicaForm.get("exploracion_fisica_peso")?.setValue(response?.item?.historia_clinica?.exploracion_fisica_peso)
          
          this.apiSevice.getDiagnosticosByHistoriaClinicaID(this.historia_clinica_id).subscribe((respuesta:any) => {
      
            this.diagnosticosList = respuesta.items;
            /* if(this.diagnosticosList.length > 0){
              this.isAprobadoAnyConsulta = true;
            } */
          })

          this.apiSevice.getTratamientosByHistoriaClinicaID(this.historia_clinica_id).subscribe((respuesta:any)=> {
            this.tratamientosList = respuesta.items;
            let nuevosTratamientos:any = []
         
            this.tratamientosList = this.tratamientosList.map((tratamiento) => {
              let maestroData = {}
            
                if(tratamiento.maestro_id && tratamiento.maestro_id !== 'RECHAZADO'){
                  this.apiSevice.getMaestroPerfil(tratamiento.maestro_id).subscribe((res:any) => {
                    if(res){
                      maestroData = res;
                     this.apiSevice.getUser(tratamiento.maestro_id).subscribe((resUser:any) => {
                  
                      maestroData = {
                        ...maestroData,
                        ...resUser
                      }
                    
                    
                      nuevosTratamientos.push({
                        ...tratamiento,
                        diagnosticoItem: this.diagnosticosList.find((d:any) => d._id === tratamiento.diagnostico_id),
                        maestroData
                      })
                      return;
                     })
                    }
                  })
                }else{
                  nuevosTratamientos.push({
                    ...tratamiento,
                    diagnosticoItem: this.diagnosticosList.find((d:any) => d._id === tratamiento.diagnostico_id),
                    maestroData 
                  })
                return;
                }
               
              return;
             
            })

         
            this.tratamientosList = nuevosTratamientos;
          })
          },
          (error: any) => {
            console.error('Error al registrar el usuario', error);
          }
        );
      }


      this.historiaClinicaForm.controls.estado_origen.valueChanges.subscribe((res:any) => {
        console.log("res:", res)
        const find = this.estadosMexico.find((r) => r.value === res)
        if(find){
          this.ciudades = find.municipios
        }
      })
    })

  
this.historiaClinicaForm.controls.fecha_de_nacimiento.valueChanges.subscribe((valor:any)=>{
  const fechaNacimiento = valor;
  const edad= this.calcularEdad(fechaNacimiento);

  if(edad!=-1){
   if (edad < 18) {
     this.esMayorDeEdad =false;
     this.esMenordeEdad = true;
   } else{
     this.esMayorDeEdad = true;
     this.esMenordeEdad = false;
   }
 }else{
   this.esMayorDeEdad=false;
   this.esMenordeEdad = false;
 }

}) 



    this.historiaClinicaForm.controls.Diabeticos.valueChanges.subscribe((valor:any) => {
        if(valor){
          this.esDiabetico = true;
        }else{
          this.esDiabetico = false;
        }
    })

    this.historiaClinicaForm.controls.alcoholismo.valueChanges.subscribe((valor:any) => {
      if(valor){
        this.esAlcoholico = true;
      }else{
        this.esAlcoholico = false;
      }
  })

  
    this.historiaClinicaForm.controls.tabaquismo.valueChanges.subscribe((valor:any) => {
      if(valor){
        this.esFumador = true;
      }else{
        this.esFumador = false;
      }
  })


    this.historiaClinicaForm.controls.Epilepticos.valueChanges.subscribe((valor:any) => {
      if(valor){
        this.esEpileptico = true;
      }else{
        this.esEpileptico = false;
      }
    })


    this.historiaClinicaForm.controls.Reumaticos.valueChanges.subscribe((valor:any) => {
      if(valor){
        this.esReumatico = true;
      }else{
        this.esReumatico = false;
      }
    })


    this.historiaClinicaForm.controls.Alergicos.valueChanges.subscribe((valor:any) => {
      if(valor){
        this.esAlergico = true;
      }else{
        this.esAlergico = false;
      }
    })



  }



//Funcion para obtener la edad del paciente
  public calcularEdad(fecha_nacimiento: string){
    // Verificar si la fecha de nacimiento es proporcionada
    if (!fecha_nacimiento) {
      console.error("Fecha de nacimiento no proporcionada");
      return -1; // Retorna un valor negativo para indicar un error o una edad no válida
    }
    // Convertir la cadena de fecha de nacimiento a un objeto Date
    const fechaNacimiento = new Date(fecha_nacimiento);
    // Obtener la fecha actual
    const ahora = new Date();
    // Calcular la diferencia de años
    const edad = ahora.getFullYear() - fechaNacimiento.getFullYear();
    // Verificar si el cumpleaños ya pasó este año
    if (
      ahora.getMonth() < fechaNacimiento.getMonth() ||
      (ahora.getMonth() === fechaNacimiento.getMonth() &&
        ahora.getDate() < fechaNacimiento.getDate())
    ) {
      return edad - 1; 
    } else {
      return edad;
    }

  }

  //madre de la alerta, si funciona pero no se que cagadero tenga la de actualizar
  firma_showConfirmDialog() {
    if(!this.firmaImagen){
      Swal.fire({
        title: 'Advertencia',
        text: 'No puedes continuar si no has firmado la carta de autorización.',
        icon: 'warning',
        confirmButtonText: 'Entendido',
        customClass: {
          confirmButton: 'btn btn-warning',
        },
        buttonsStyling: false,
      });
      return;
    }
    if(this.esMenordeEdad){
      if(!this.historiaClinicaForm.controls.nombre_tutor.value){
        Swal.fire({
          title: 'Advertencia',
          text: 'No puedes continuar si no has rellenado el campo: NOMBRE DEL PADRE O TUTOR:.',
          icon: 'warning',
          confirmButtonText: 'Entendido',
          customClass: {
            confirmButton: 'btn btn-warning',
          },
          buttonsStyling: false,
        });
        return;
      } 
    }

    
    Swal.fire({
      title: '¿Estás seguro de que deseas firmar la carta de autorizacion?',
      text: "Una vez firmada, no podrá editar la información general ni los antecedentes. ¿Desea continuar? No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, firmar ahora',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
      allowEscapeKey: false   
    }).then((result) => {
      if (result.isConfirmed) {
        this.isFirmadaAutorizacion = true;
        this.onSubmit()
      }
    });
  }


  public viewEvidencia(url:string){
    window.open(url,"_blank")
  }


  public onSubmit() {
   
    
    const item = {
     ...this.historiaClinicaForm.value,
     isFirmadaAutorizacion: this.isFirmadaAutorizacion,
     firmaPaciente: this.firmaImagen,
      paciente: {
        nombre_completo: this.historiaClinicaForm.get("nombre_completo")?.value,
        fecha_de_nacimiento : this.historiaClinicaForm.get("fecha_de_nacimiento")?.value,
        genero: this.historiaClinicaForm.get("genero")?.value,
        estado_civil: this.historiaClinicaForm.get("estado_civil")?.value,
        ocupacion: this.historiaClinicaForm.get("ocupacion")?.value,
        domicilio: this.historiaClinicaForm.get("domicilio")?.value,
        telefono: this.historiaClinicaForm.get("telefono")?.value,
        ciudad_origen: this.historiaClinicaForm.get("ciudad_origen")?.value,
        estado_origen: this.historiaClinicaForm.get("estado_origen")?.value,
        pais_origen: this.historiaClinicaForm.get("pais_origen")?.value,
        ciudad_Actual : this.historiaClinicaForm.get("ciudad_Actual")?.value,
        nombre_contacto_emergencia: this.historiaClinicaForm.get("nombre_contacto_emergencia")?.value,
        parentesco_contacto_emergencia: this.historiaClinicaForm.get("parentesco_contacto_emergencia")?.value,
        telefono_contacto_emergencia: this.historiaClinicaForm.get("telefono_contacto_emergencia")?.value,


      }
    };


    this.apiSevice.updateHistoriaClinica(this.historia_clinica_id, item).subscribe(
      (response: any) => {
  
        this.historiaClinicaForm.reset();
        Swal.fire(
          'Historia clinica actualizada con exito',
          'En breve seras redirigido a tu tablero digital...',
          'success'
        )
        setTimeout(() => {
          this._general.navigateBy('/estudiante');
        }, 3000);
      },
      (error: any) => {
        console.error('Error al guardar la historia clinica', error);
      }
    );
  }


  public fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to read file as Base64'));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

 

  public otroCheckbox() {
    this.historiaClinicaForm.get("aparatos_sistemas_digestivo_Otros")?.valueChanges.subscribe((valor:any) => {
      this.showDigestivoOtroTextarea = valor
    })

    this.historiaClinicaForm.get("aparatos_sistemas_respiratorio_Otros")?.valueChanges.subscribe((valor:any) => {
      this.showRespiratorioOtroTextarea = valor
    })

    this.historiaClinicaForm.get("aparatos_sistemas_circulatorio_Otros")?.valueChanges.subscribe((valor:any) => {
      this.showCirculatorioOtroTextarea = valor
    })

    this.historiaClinicaForm.get("aparatos_sistemas_genito_urinario_Otros")?.valueChanges.subscribe((valor:any) => {
      this.showGenitoUrinarioOtroTextarea = valor
    })

    this.historiaClinicaForm.get("aparatos_sistemas_sist_nervioso_Otros")?.valueChanges.subscribe((valor:any) => {
      this.showSistNerviosoOtroTextarea = valor
    })

    this.historiaClinicaForm.get("aparatos_sistemas_sintomas_generales_otros")?.valueChanges.subscribe((valor:any) => {
      this.showSintomasGeneralesOtroTextarea = valor
    })

    
   
  }

  

  public nextPaso2(){
    this.showPacienteInfoTab = false;
    this.showExploracionInfoTab = false;
    this.showAparatosInfoTab = false;
    this.showAntecedentesInfoTab = true;
  }

  public nextPasoAutorizacion(){
    this.showPacienteInfoTab = false;
    this.showExploracionInfoTab = false;
    this.showAparatosInfoTab = false;
    this.showAntecedentesInfoTab = false;
    this.showAutorizacionInfoTab = true;
  }

  public nextPaso3(){
    this.showPacienteInfoTab = false;
      this.showExploracionInfoTab = false;
      this.showAparatosInfoTab = true;
      this.showAntecedentesInfoTab = false;
  }

  public nextPaso4(){
    this.showPacienteInfoTab = false;
    this.showExploracionInfoTab = true;
    this.showAparatosInfoTab = false;
    this.showAntecedentesInfoTab = false;
  }

  public nextPaso5(){
    this.showPacienteInfoTab = false;
    this.showExploracionInfoTab = false;
    this.showAparatosInfoTab = false;
    this.showAntecedentesInfoTab = false;
  }


  public changeTab(tabName: string) {
    if (tabName === 'informacion_general_del_paciente') {
      this.showPacienteInfoTab = true;
      this.showExploracionInfoTab = false;
      this.showAparatosInfoTab = false;
      this.showAntecedentesInfoTab = false;
      this.showAutorizacionInfoTab = false;
      this.showDiagnosticosInfoTab = false;
    }
    if (tabName === 'antecedentes') {
      this.showPacienteInfoTab = false;
      this.showAntecedentesInfoTab = true
      this.showExploracionInfoTab = false;
      this.showAparatosInfoTab = false;
      this.showAutorizacionInfoTab = false;
      this.showDiagnosticosInfoTab = false;
    }
    if (tabName === 'aparatos_y_sistemas') {
      this.showPacienteInfoTab = false;
      this.showExploracionInfoTab = false;
      this.showAparatosInfoTab = true;
      this.showAntecedentesInfoTab = false;
      this.showAutorizacionInfoTab = false;
      this.showDiagnosticosInfoTab = false;
    }
    if (tabName === 'exploracion_fisica') {
      this.showPacienteInfoTab = false;
      this.showExploracionInfoTab = true;
      this.showAparatosInfoTab = false;
      this.showAntecedentesInfoTab = false;
      this.showAutorizacionInfoTab = false;
      this.showDiagnosticosInfoTab = false;
    }
    if (tabName === 'carta') {
      this.showPacienteInfoTab = false;
      this.showExploracionInfoTab = false;
      this.showAparatosInfoTab = false;
      this.showAntecedentesInfoTab = false;
      this.showAutorizacionInfoTab = true;
      this.showDiagnosticosInfoTab = false;
    }

    if(tabName === 'diagnosticos_tratamientos'){
      this.showPacienteInfoTab = false;
      this.showExploracionInfoTab = false;
      this.showAparatosInfoTab = false;
      this.showAntecedentesInfoTab = false;
      this.showAutorizacionInfoTab = false;
      this.showDiagnosticosInfoTab=true;
    }
  }

  public OpenDiagnosticoForm(){
    this._router.navigateByUrl(`estudiante/diagnostico/${this.historia_clinica_id}`)
  }

  public OpenDiagnosticoViewForm(diagnostico_id:string, tratamiento_id?:string){
    if(!tratamiento_id){
      this._router.navigateByUrl(`estudiante/diagnostico-view/${diagnostico_id}`)
    }
    if(tratamiento_id){
      this._router.navigateByUrl(`estudiante/diagnostico-view/${diagnostico_id}?tratamiento=${tratamiento_id}`)
    }
  }
}
