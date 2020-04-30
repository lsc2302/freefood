const foods = ['Amarican_Food','Arabic_Food','Argentina_food',
  'barbeque','beer','biscuit','Brazil_food','British_Food','burger','burrito',
  'cake','candies','chicken','chocolate','beef',
  'crab','drinks','dumpling','European_Food','fish','French_Food','fries',
  'Hong_Kong_Food','hotdog','Indian_Food','Israeli_Food',
  'Italian_Food','Japanese_Food','Korean_Food','lobster','Mediterranean_Food',
  'milk','lamb','Pizza','pork','ramen','Russian_Food','sandwich','shrimp',
  'snacks','Spanish_Food','sushi','taco','Taiwanese_Food','Thai_Food',
  'Turkish_Food','Vietnamese_Food'
];

export const FoodTypes = foods.reduce(function(total, cur){
  total.push({
    key: cur,
    text: cur,
    value: cur,
    image: { avatar: true, src: '/images/'+cur+'.png'},
  });
  return total;
},[]);