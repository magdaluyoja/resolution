import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Resolutions = new Mongo.Collection('resolutions');


Template.body.helpers({
	resolutions: function(){
		if(Session.get('hideFinished')){
			return Resolutions.find({checked:{$ne: true}}); // $ne means not equal
		}
		else{
			return Resolutions.find();
		}
	},
	hideFinished:function(){
		return Session.get('hideFinished');
	}
});

//event listener
Template.body.events({
	'submit .new-resolution': function(event){
		var title	=	event.target.title.value; //getter
		//save to collection
		Resolutions.insert({
			title: title,
			createdAt: new Date()
		});

		event.target.title.value = "";
		return false;
	},
	'change .hide-finished':function(event){
		Session.set('hideFinished', event.target.checked);// run meteor add session to command line to use Session
	}
});
//event listener
Template.resolution.events({
	'click .delete': function(){
		Resolutions.remove(this._id);
	},
	'click .toggle-ckecked': function(){
		Resolutions.update(this._id,{$set:{checked:!this.checked}});
	},
});