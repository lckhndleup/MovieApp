//ekledğimiz filmleri local storage a ekleyelim.
class Storage{
    static addFilmToStorage(newFilm){
        

        let films = this.getFilmsFromStorage(); 

        films.push(newFilm);

        localStorage.setItem("films",JSON.stringify(films)); .
    
    }
    //----------------------------------------------------------------------------------------


    //----------------------------------------------------------------------------------------
    static getFilmsFromStorage(){

        
        let films;

        if(localStorage.getItem("films") === null){  
            films = [];
        }
        else {
            films = JSON.parse(localStorage.getItem("films"));
        }
        return films; //bu fonksiyon bize bir array dönecek.
    }

    //----------------------------------------------------------------------------------------
    //filmleri storagedan silme:
    static deleteFilmFromStorage(filmTitle){
        
        //localden array imizi alalım.
        let films = this.getFilmsFromStorage();
        //splice metodu ile arrayden silme yapıyoruz
        films.forEach(function(film,index){
            if(film.title === filmTitle){
                films.splice(index,1);
            }
        });
        localStorage.setItem("films",JSON.stringify(films));
    }

    //----------------------------------------------------------------------------------------
    //tüm filmleri storagedan silme:

    static clearAllfilmsFromStorage(){
        localStorage.removeItem("films");
    }
}
