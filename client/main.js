import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
if(Meteor.isClient){
	Template.body.helpers({
		resolutions:[
			{title:"My resolution no. 1."}
		]
	});
}

if(Meteor.isServer){
	Meteor.startup(function(){
		//code to run at server startup
	});
}