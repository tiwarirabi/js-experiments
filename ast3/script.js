var people = [{
    id: 1,
    name: "Aegon Targaryen",
    children: [{
        id: 2,
        name: "Jaehaerys Targaryen",
        children: [{
            id: 4,
            name: "Daenerys Targaryen"
        }, {
            id: 5,
            name: "Rhaegar Targaryen",
            children: [{
                id: 6,
                name: "Aegon Targaryen"
            }]
        }]
    }, {
        id: 3,
        name: "Rhaelle Targaryen"
    }],
}];


var flatTree = [];

var findChildrens = (parent) =>{
    var parentId = -1;
    if( !(parent.length>0) && parent.hasOwnProperty("children")){
        parentId = parent.id;
        parent = parent.children;
    }

    if(parent.length>0){
        parent.forEach((person)=>{
            flatTree.push({
                id:person.id,
                name:person.name,
                children:[],
            });

            if(parentId>-1){
                var parentIndex = flatTree.findIndex(object => object.id === parentId);
                if(parentIndex>-1) flatTree[parentIndex].children.push(person.id);
            }
            
            if(person.hasOwnProperty("children")) findChildrens(person);
        });
    }
}

findChildrens(people);

flatTree.sort((a,b)=>{return a.id-b.id});

console.log(flatTree);