import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import './main.html';

//Create new Collection as database
Resolutions = new Mongo.Collection('resolutions');


//helpers
Template.body.helpers({
	resolutions: function(){
		if(Session.get('hideFinished')){
			return Resolutions.find({checked:{$ne: true}}); // $ne means not equal
		}
		else{
			return Resolutions.find();
		}
	},
	//Creating another helper for another class and not just for templates
	hideFinished:function(){
		return Session.get('hideFinished');
	}
});

//event listener
Template.body.events({
	'submit .new-resolution': function(event){
		var title	=	event.target.title.value; //getter
		if(title.replace(/ /g,'') !== ''){
			Meteor.call('addResolution',title);
		}
		else{
			alert('Please input your resolution.');
		}
		event.target.title.value = "";
		return false;
	},
	'change .hide-finished':function(event){
		if(event.target.checked){
			Session.set('hideFinished', 'checked');// run meteor add session to command line to use Session
			Session.set('enemy', 'Eastasia');
		}
		else{
			Session.set('hideFinished', '');// run meteor add session to command line to use Session
			Session.set('enemy', '');
		}
	}
});
//event listener
Template.resolution.events({

	'click .toggle-ckecked': function(){
		Meteor.call('updateResolution',this._id,!this.checked);
	},

	'click .delete': function(){
		Meteor.call('deleteResolution',this._id);
	},
});

Accounts.ui.config({
	passwordSignupFields:'USERNAME_ONLY'
});

