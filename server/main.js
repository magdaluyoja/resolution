import { Meteor } from 'meteor/meteor';

//Create new Collection as database
Resolutions = new Mongo.Collection('resolutions');

Meteor.startup(() => {
  // code to run on server at startup

});
Meteor.methods({
	addResolution:function(title){
		//save to collection
		Resolutions.insert({
			title: title,
			createdAt: new Date()
		});
	},
	updateResolution:function(id,checked){
		Resolutions.update(id,{$set:{checked: checked}});
	},
	deleteResolution:function(id){
		Resolutions.remove(id);
	}
});