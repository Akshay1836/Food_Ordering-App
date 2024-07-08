// let user={
//         name:"akshay",
//         class:"tenth",
//         getname:function(state){
//                 console.log(this.name,state)
//         }
// }

// let user1={
//         name:"ajay",
//         class:"eleven",
// };

// user.getname("kerala");
// user.getname.apply(user1,["tamilnadu"]);
// let getdetails=user.getname.bind(user1,"tamilnadu");
// getdetails()



let name={
        firstName:"akshay",
        secondName:"VM",
       
}

let getName=function(town){
        console.log(this.firstName+" "+this.secondName+" from "+town)
}

let name2={
        firstName:"anulakshmi",
        secondName:"VM",
}

getName.call(name,"chennai");
getName.call(name2,"ekm")
getName.apply(name2,["chennai"])
let calllater=getName.bind(name,["karimpadam"])
calllater()