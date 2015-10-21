<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.7.1.js"></script>
	<script type="text/javascript">
	function validateData (title, desc, deadline, filesize)
	{
		this._title= title;
		this._desc=desc;
		//deadline
		this._year=deadline.year;
		this._month= deadline.month;
		this._day=deadline.day;
		//filesize
		this._filesize= filesize; //in bytes
	}

	validateData.prototype= {
		isTitleValid: function()
		{
			if(this._title=="" || this._title.length >25 )
				return false;
			else 
				return true;
		},
		isDescValid: function ()
		{
			if( this._desc >140 )
				return false;
			else 
				return true;
		},
		isDateValid : function ()
		{
			var currentDate= new Date();
			var currYear= currentDate.getFullYear();
			var currMonth= currentDate.getMonth() +1;
			var currDay= currentDate.getDate();
			var check;
			if (currYear != this._year)
			{
				if(this._year > currYear)
					check= true;
				else 
					check= false;
			}
			else 
			{
				if (currMonth != this._month)
				{
					if(this._month > currMonth)
						check= true;
					else 
						check= false;
				}
				else 
				{
					if(this._day >= currDay)
						check=true;
					else 
						check=false;
				}
			}
			return check;
		},
		//only when using html <input> type=file attribute and jquery... (implemented below)
		isSizeValid : function ()
		{
		if(this._filesize > 2e+6) //2MB 
                 return false;
                 else 
                 return true;
		}
	};

	function validateTask (title, desc, deadline,filesize)
	{
		var validate= new validateData(title,desc,deadline,filesize);
		var v1=validate.isTitleValid();
		var v2= validate.isDescValid();
		var v3=validate.isDateValid();
		var v4=validate.isSizeValid();
		var resultsArray = [v1,v2,v3,v4];
		var checkedResult = {
			isSucces: true,
			id : [],
			error: []
		};
		for (i=0; i <4 ; i++)
		{
			if (!resultsArray[i])
			{
				switch (i)
				{
					case 0:
				   checkedResult.id.push(0);
					checkedResult.error.push("Invalid Title");
					break;
					case 1:
					checkedResult.id.push(1);
					checkedResult.error.push("Invalid Description");
					break;
					case 2:
					checkedResult.id.push(2);
					checkedResult.error.push("Invalid Deadline date");
					break;
					case 3:
					checkedResult.id.push(3);
					checkedResult.error.push("Invalid file size");
					break;
				}
				checkedResult.isSucces=false;
			}
		}
		    return checkedResult;
	}

	//getfilesize from <input> type=file, using jquery
	$(function(){
		$('#fileName').change(function(){ //#fileName is the id of html control
			var f=this.files[0]
			var size= f.size;
			//then pass the var size to the required function;
		})
	})


  /* //testing purpose 

	var Deadline= {
    	year: 2014,
    	month:10,
    	day:20
    };
	function testMyFunction(){
		var title="This is invalid title cuz lots of charssssssssssssssssssssssssssssss";
		var desc="Nice valid description";
		var deadline=Deadline;
		var filesize=2222; 
		test= validateTask(title,desc,deadline,filesize);
		if(test.isSucces)
			alert("Everything is valid w el7yah 7lwa");
		else{
			alert(test.id + "\n " + test.error);
		}
	}*/
	</script>
