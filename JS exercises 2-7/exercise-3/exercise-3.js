var obj = {
  name : 'Samip Shrestha',
  adress: 'Dholahity',
  emails: 'samip0884@gmail.com',
  interests: ['Coding', 'Games', 'Anime', 'Series'],
  education: [
      {
          name: 'Little Angels` School',
          enrolledDate : '2006'
      },
      {
          name: 'Little Angels` Heigher Secondary School',
          enrolledDate : '2014'
      },
      {
          name: 'Kathmandu Engineering College',
          enrolledDate : '2016'
      }
  ]
};


obj.education.forEach(function(institute){
  console.log("Name: " + institute.name + ", Date:" + institute.enrolledDate);
})