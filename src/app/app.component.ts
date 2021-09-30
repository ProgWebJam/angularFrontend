import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstadoService } from './services/estado/estado.service';
import { PaisService } from './services/pais/pais.service';
import { PersonaService } from './services/persona/persona.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'PersonaFrontend';

  personForm : FormGroup;
  pais : any;
  estado : any;
  persona : any;

  constructor( public fb : FormBuilder , 
    public estadoService : EstadoService, 
    public paisService : PaisService,
    public personaService : PersonaService){

  }

  ngOnInit(): void {
    
    this.personForm = this.fb.group({
      id : [''],
      nombre : ['',Validators.required],
      apellido : ['',Validators.required],
      edad : ['',Validators.required],
      pais : ['',Validators.required],
      estado : ['',Validators.required],
    });

    this.paisService.getAllpais().subscribe(resp=>{

      this.pais = resp;
      //console.log(resp);

    },
    error=> { console.error(error) }
    
    );


    this.personForm.get('pais').valueChanges.subscribe(value=>{

      this.estadoService.getAllEstadoByPais(value.id).subscribe(resp=>{

        this.estado = resp;

    },
      error=> { console.error(error) }

      );
    
  }),


  this.personaService.getAllPersona().subscribe(resp=>{

    this.persona = resp;

  },
  error=> { console.error(error) }
  
  );


  }


  guardar():void{

    this.personaService.savePersona(this.personForm.value).subscribe(resp=>{

      this.personForm.reset();
      this.persona = this.persona.filter(persona => resp.id !== persona.id );
      this.persona.push(resp);

    },
    error=> { console.error(error) }
    
    )


  }


  eliminar(persona){

    this.personaService.deletePersona(persona.id).subscribe(resp=>{

      if(resp===true){

        this.persona.pop(persona)

      }

    })
  }

  editar(persona){

    this.personForm.setValue({

      id : persona.id,
      nombre : persona.nombre ,
      apellido : persona.apellido ,
      edad : persona.edad ,
      pais : persona.pais ,
      estado : persona.estado ,

    });

  }


  /*cargarEstadoPorPaisId(event){

    this.estadoService.getAllEstadoByPais(event.target.value).subscribe(resp=>{

      this.estado = resp;
      //console.log(resp);

    },
    error=> { console.error(error) }
    
    )

  }*/



}
