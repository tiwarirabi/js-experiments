

window.onload = () => {
    
    
    var list = [{
        name: "Instant Queue",
        videos: [{
            "id": 70111470,
            "title": "Die Hard",
            "boxarts": [{
                width: 150,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg"
              },
              {
                width: 200,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg"
              }
            ],
            "url": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 4.0,
            "bookmark": []
          },
          {
            "id": 70111471,
            "title": "Humming Man",
            "boxarts": [{
                width: 150,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg"
              },
              {
                width: 150,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg"
              }
            ],
            "url": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 4.0,
            "bookmark": []
          },
          {
            "id": 654356453,
            "title": "Bad Boys",
            "boxarts": [{
                width: 200,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg"
              },
              {
                width: 150,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg"
              }
    
            ],
            "url": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 5.0,
            "bookmark": [{
              id: 432534,
              time: 65876586
            }]
          }
        ]
      },
      {
        name: "New Releases",
        videos: [{
            "id": 65432445,
            "title": "The Chamber",
            "boxarts": [{
                width: 150,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg"
              },
              {
                width: 200,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg"
              }
            ],
            "url": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 4.0,
            "bookmark": []
          },
          {
            "id": 675465,
            "title": "Fracture",
            "boxarts": [{
                width: 150,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg"
              },
              {
                width: 150,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg"
              },
              {
                width: 300,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg"
              }
            ],
            "url": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 5.0,
            "bookmark": [{
              id: 432534,
              time: 65876586
            }]
          }
        ]
      }
    ];
    
    //variable to store the final output for the movies with box art of width =150 and height = 200
    var finalMovies = [];

    if(list.length > 0)
        list.map((singleList)=>{
            singleList.videos.map((singleMovie)=>{
                if(singleMovie.boxarts.length>=1)
                    singleMovie.boxarts.map((singleBoxArt)=>{
                        if(singleBoxArt.width === 150 && singleBoxArt.height === 200){
                            if(finalMovies.findIndex(object => object.name === singleList.name) > -1){
                                //The list with this name is already there, so adding to the same list 
                                thisListIndex = finalMovies.findIndex(object => object.name === singleList.name);
                                
                                //Checking for the movie is added already or not
                                if(finalMovies[thisListIndex].videos.findIndex(object => object.id == singleMovie.id)>-1){
                                    //The movie was also already added
                                    thisVideoIndex = finalMovies[thisListIndex].videos.findIndex(object => object.id == singleMovie.id);
                                    finalMovies[thisListIndex].videos[thisVideoIndex].boxarts.push(singleBoxArt);   
                                }else{
                                    //The movie was not previously added to the list, so adding the movie to the list
                                    finalMovies[thisListIndex].videos.push({
                                        id:singleMovie.id,
                                        title:singleMovie.title,
                                        boxarts:[singleBoxArt],
                                    });
                                }
                            }else{
                                finalMovies.push({
                                            name:singleList.name,
                                            videos:[
                                                {
                                                    id:singleMovie.id,
                                                    title:singleMovie.title,
                                                    boxarts:[singleBoxArt],
                                                }
                                            ]
                                        }
                                    );
                            }
                        }
                    });
            });
        });
        

    console.log(finalMovies);
}