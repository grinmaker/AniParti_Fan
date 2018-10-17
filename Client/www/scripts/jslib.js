function dateFormate(date){
	     const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];
    var d = date.getDate();
	var m = monthNames[date.getMonth()];
	var y = date.getFullYear();
	return d+" "+m+", "+y;
	
	
}