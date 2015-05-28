'use strict';


(function() {

	var stepsJson = [];

	//-- data load/display functions

	function loadJSON(callback) {
		var xobj = new XMLHttpRequest();
		xobj.overrideMimeType('application/json');
		xobj.open('GET', '/scripts/services/steps.json', true);

		xobj.onreadystatechange = function() {
			if (xobj.readyState === 4) {
				callback(xobj.responseText);
			}
		};
		xobj.send(null);
	}

	//-- steps generator
	function generateSteps(stepData) {
		var steps = stepData.map(function(step, index) {
			if (index===0) {
				return (
					'<li id="step-' + (index+1) + '" class="step" onclick="setStep(' + (index+1) + ')">' + step.tittle + '<i class="fa fa-' + step.icon + '"></i></li><!--'
				);    
			}
			return (
				'--><li id="step-' + (index+1) + '" class="step" onclick="setStep(' + (index+1) + ')">' + step.tittle + '<i class="fa fa-' + step.icon + '"></i></li><!--'
			);
		});
		return steps;
	}

	//-- steps-data generator
	function generateStepsData(stepData) {
		var steps = stepData.map(function(step, index) {
			if (index===0) {
				return ('<li><div class="step-header"><i class="fa fa-'+step.icon+' fa-3"></i><div class="step-tittle"><h1 >'+step.tittle+'</h1><h2>'+step.subTittle+'</h2></div></div><p>'+step.p+'</p><p>'+step.p2+'</p></li><!--'
				);    
			}
			return (
				'--><li><div class="step-header"><i class="fa fa-'+step.icon+' fa-3"></i><div class="step-tittle"><h1 >'+step.tittle+'</h1><h2>'+step.subTittle+'</h2></div></div><p>'+step.p+'</p><p>'+step.p2+'</p></li><!--'
			);
		});
		return steps;
	}

	//-- built steps module
	window.builtStep = function(response) {
		stepsJson = JSON.parse(response);

		document.getElementById('steps').innerHTML = generateSteps(stepsJson.steps);
		document.getElementById('steps').innerHTML += '<li id="indicator"></li>';
		document.getElementById('step-data').innerHTML = generateStepsData(stepsJson.steps);
		
	};


	//-- steps functions
	window.changeStep = function(top) {
		if(top===1){
			document.getElementById('step-data').style.top= '0px';
		}
		else{
			document.getElementById('step-data').style.top= -((top-1)*200)-((top-1))+'px';
		}
	};

	window.setIndicator = function(top) {
		document.getElementById('indicator').style.top= (top*60)-60+'px';
	};

	window.setStep = function(top) {
		//set indicator in current step
		window.setIndicator(top);
		//set current step
		window.changeStep(top);
	};

	//--------
	// Main

	loadJSON(function(response) {
		window.builtStep(response);
	});


})();
