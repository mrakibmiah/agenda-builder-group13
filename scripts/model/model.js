// JavaScript Document

// The possible activity types
var ActivityType = [
    {value: 0, label: 'Presentation',color:"#587498"}, //blue
    {value: 1, label: 'Group Work',color:"#E86850"}, //red
    {value: 2, label: 'Discussion',color:"#55A763"}, //green
    {value: 3, label: 'Break',color:"#FFD800"} //yellow
];

// This is an activity constructor
// When you want to create a new activity you just call
// var act = new Activity("some activity",20,1,"Some description);
function Activity(name, length, typeid, description, color) {
    var _name = name;
    var _length = length;
    var _typeid = typeid;
    var _description = description;
    var _color = color;
    var _start = 0;
    var _end = 0;

    this.setStart = function (start) {
        _start = start;
    }
    this.setEnd = function (end) {
        _end = end;
    }
    this.getEnd = function () {
        var end = _end;
        
        if (end % 60==0){
            return Math.floor(end / 60) + ":00";
        }else if (end%60<10){
            return Math.floor(end / 60) + ":0"+ end % 60;
        }else{
            return Math.floor(end / 60) + ":" + end % 60;
        }
    };

    this.getStart = function () {
        if (_start % 60==0){
            return Math.floor(_start / 60) + ":00";
        }else if (_start%60<10){
            return Math.floor(_start / 60) + ":0"+ _start % 60;
        }else{
            return Math.floor(_start / 60) + ":" + _start % 60;
        }
    };
    // sets the name of the activity
    this.setName = function (name) {
        _name = name;      
    }

    // get the name of the activity
    this.getName = function (name) {
        return _name;
    }

    // sets the name of the activity
    this.setColor = function (color) {
        _color = color;
       
    }

    // get the name of the activity
    this.getColor = function () {
        return _color;
    }

    // sets the length of the activity
    this.setLength = function (length) {
        _length = length;       
    }

    // get the name of the activity
    this.getLength = function () {
        return _length;
    }

    // sets the typeid of the activity
    this.setTypeId = function (typeid) {
        _typeid = typeid;       
    }

    // get the type id of the activity
    this.getTypeId = function () {
        return _typeid;
    }

    // sets the description of the activity
    this.setDescription = function (description) {
        _description = description;       
    }

    // get the description of the activity
    this.getDescription = function () {
        return _description;
    }

    // This method returns the string representation of the
    // activity type.
    this.getType = function () {
        return ActivityType[_typeid].label;
    };

}

// This is a day consturctor. You can use it to create days, 
// but there is also a specific function in the Model that adds
// days to the model, so you don't need call this yourself.
function Day(startH, startM) {
    this._start = startH * 60 + startM;
    this._activities = [];
    this._stacked = [];
 //   this._accLength = 8;


    this.getAccLength = function () {
        var accLength = 8;
        angular.forEach(this._activities, function (activity) {
                accLength += activity.getLength();
        });
        return accLength; 
//        return 5201314;
    };

    this.upDateGraphicalTimeLine = function () {
        this._stacked = [];
        var types = ['presentation', 'group-work', 'discussion', 'break'];
        var labels = ['Presentation', 'Group Work', 'Discussion', 'Break'];
        for (var i = 0, n = 4; i < n; i++) {
            var ln = this.getLengthByType(i);
            this._stacked.push({
                value: Math.floor(ln / this.getTotalLength() * 100),
                type: types[i],
                label: labels[i]
            });
        }
    }

    // sets the start time to new value
    this.setStart = function (startH, startM) {
        this._start = startH * 60 + startM;       
    }

    // returns the total length of the acitivities in 
    // a day in minutes
    this.getTotalLength = function () {
        var totalLength = 0;
        angular.forEach(this._activities, function (activity) {
            //console.log("tag" + index);
            totalLength += activity.getLength();
        });
        return totalLength;
    };


    // returns the string representation Hours:Minutes of 
    // the end time of the day
    this.getEnd = function () {
        var end = this._start + this.getTotalLength();

        if (end % 60==0){
            return Math.floor(end / 60) + ":00";
        }else if (end%60<10){
            return Math.floor(end / 60) + ":0"+ end % 60;
        }else{
            return Math.floor(end / 60) + ":" + end % 60;
        }
        
    };

    // returns the string representation Hours:Minutes of 
    // the start time of the day
    this.getStart = function () {
        if (this._start % 60==0){
            return Math.floor(this._start / 60) + ":00";
        }else if (this._start%60<10){
            return Math.floor(this._start / 60) + ":0"+ this._start % 60;
        }else{
            return Math.floor(this._start / 60) + ":" + this._start % 60;
        }
    };

    // returns the length (in minutes) of activities of certain type
    this.getLengthByType = function (typeid) {
        var length = 0;
        angular.forEach(this._activities, function (activity) {
            if (activity.getTypeId() == typeid) {
                length += activity.getLength();
            }
        });
        return length;
    };

    // adds an activity to specific position
    // if the position is not provided then it will add it to the 
    // end of the list
    this._addActivity = function (activity, position) {
        if (position != null) {
            this._activities.splice(position, 0, activity);
        } else {
            this._activities.push(activity);

        }
    };

    // removes an activity from specific position
    // this method will be called when needed from the model
    // don't call it directly
    this._removeActivity = function (position) {
        return this._activities.splice(position, 1)[0];
    };

    // moves activity inside one day
    // this method will be called when needed from the model
    // don't call it directly
    this._moveActivity = function (oldposition, newposition) {
        // In case new position is greater than the old position and we are not moving
        // to the last position of the array
        if (newposition > oldposition && newposition < this._activities.length - 1) {
            newposition--;
        }
        var activity = this._removeActivity(oldposition);
        this._addActivity(activity, newposition);
    };

}


// this is our main module that contians days and praked activites
function Model() {
    this.days = [];
    this.parkedActivities = [];

    // adds a new day. if startH and startM (start hours and minutes)
    // are not provided it will set the default start of the day to 08:00
    this.addDay = function (startH, startM) {
        var day;
        if (startH) {
            day = new Day(startH, startM);
        } else {
            day = new Day(8, 0);
        }
        this.days.push(day);
        this.notifyObservers();
        return day;
    };

    // add an activity to model
    this.addActivity = function (activity, day, position) {
        if (day != null) {
            this.days[day]._addActivity(activity, position);
        } else {
            if (position != null) {
                this.parkedActivities.splice(position, 0, activity);
            }
            else
                this.parkedActivities.push(activity);
        }
        this.notifyObservers();
    }

    this.removeDay = function (index) {
        this.days.splice(index, 1);
    }

    this.removeActivityDay = function (indexDay, index) {
        act=this.days[indexDay]._activities.splice(index,1)[0];
        this.notifyObservers;
        console.log("remove");
        return act;
    }

    // add an activity to parked activities
    this.addParkedActivity = function (activity, position) {
        this.addActivity(activity, null, position);
    };

    // remove an activity on provided position from parked activites 
    this.removeParkedActivity = function (position) {
        act = this.parkedActivities.splice(position, 1)[0];
        this.notifyObservers();
        return act;
    };

    // moves activity between the days, or day and parked activities.
    // to park activity you need to set the new day to null
    // to move a parked activity to let's say day 0 you set oldday to null
    // and new day to 0
    this.moveActivity = function (oldday, oldposition, newday, newposition) {
        if (oldday !== null && oldday == newday) {
            this.days[oldday]._moveActivity(oldposition, newposition);
        } else if (oldday == null && newday == null) {
            var activity = this.removeParkedActivity(oldposition);
            this.addParkedActivity(activity, newposition);
        } else if (oldday == null) {
            var activity = this.removeParkedActivity(oldposition);
            this.days[newday]._addActivity(activity, newposition);
        } else if (newday == null) {
            var activity = this.days[oldday]._removeActivity(oldposition);
            this.addParkedActivity(activity, newposition);
        } else {
            var activity = this.days[oldday]._removeActivity(oldposition);
            this.days[newday]._addActivity(activity, newposition);
        }
        this.notifyObservers();
    };

    //*** OBSERVABLE PATTERN ***
    var listeners = [];

    this.notifyObservers = function (args) {
        for (var i = 0; i < listeners.length; i++) {
            listeners[i].update(args);
        }
    };

    this.addObserver = function (listener) {
        listeners.push(listener);
    };
    //*** END OBSERVABLE PATTERN ***
}

// this is the instance of our main model
// this is what you should use in your application
//var model = new Model();
//createTestData(model);

// you can use this method to create some test data and test your implementation
function createTestData(model) {
    model.addDay();
    model.addActivity(new Activity("Introduction", 10, 0, ""), 0);
    model.addActivity(new Activity("Idea 1", 30, 0, ""), 0);
    model.addActivity(new Activity("Working in groups", 35, 1, ""), 0);
    model.addActivity(new Activity("Idea 1 discussion", 15, 2, ""), 0);
    model.addActivity(new Activity("Coffee break", 20, 3, ""), 0);

    console.log("Day Name: " + model.days[0]._activities[0].getName());
    console.log("Day Start: " + model.days[0].getStart());
    console.log("Day End: " + model.days[0].getEnd());
    console.log("Day Length: " + model.days[0].getTotalLength() + " min");
    angular.forEach(ActivityType, function (sample, index) {
        console.log("Day '" + ActivityType[index] + "' Length: " + model.days[0].getLengthByType(index) + " min");
    });
}
