class UI{
    static addFilmToUI(newFilm){ 

        
        const filmList = document.querySelector("#films"); //tbody i seçtik.

        
        filmList.innerHTML += ` 
            <tr>
                <td><img src="${newFilm.url}" class="img-fluid img-thumbnail"></td>
                <td>${newFilm.title}</td> 
                <td>${newFilm.director}</td>
                <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
            </tr>
        
        
        `;
    }

    //----------------------------------------------------------------------------------------

    static clearInputs(element1,element2,element3){
        element1.value = "";
        element2.value = "";
        element3.value = "";
    }

    //----------------------------------------------------------------------------------------

    //bilgilendirme mesajları :

    static displayMessages(message,type){
        
        const alert = document.createElement("div");
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        const cardBody = document.querySelectorAll(".card-body")[0];

        cardBody.appendChild(alert);

        setTimeout(function(){
            alert.remove();
        },1000);
   



    }

    //----------------------------------------------------------------------------------------
    static loadAllFilms(films){ 

        const filmList = document.querySelector("#films");
        

        films.forEach(function(film){
        UI.addFilmToUI(film);
    
        });
    
     

    }




    //------------------------------------------------------------------------------------------

    //filmi arayüzden silme:

    static deleteFilmFromUI = function(element){
        element.parentElement.parentElement.remove();
        UI.displayMessages("Film Başarıyla Silindi...","primary");
    }


    //------------------------------------------------------------------------------------------
    //tüm filmleri arayüzden kaldırma:

    static clearAllFilmsFromUI(){
        //tüm filmleri seçelim
        const filmList = document.getElementById("films");//tbody izin altında tüm filmler mevcut
        

        while(filmList.firstElementChild != null){ //yani çocugumuz oldugu sürece devam eder.
            filmList.firstElementChild.remove();
        }

        if(filmList.firstElementChild === null){
            this.displayMessages("Tüm Filmler Silindi...","warning");
        }



    }




}


