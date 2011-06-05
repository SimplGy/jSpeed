var jSpeed = jSpeed || {}; //copy or make a new one
jSpeed.Test = jSpeed.Test || {};



(function(){

	//Constructor
	jSpeed.Test = function(uaString)
	{
		this.ua = uaString;
		//Cache selectors
		$displayArea = $('#DisplayArea');

		this.bindEvents();
	}; //Constructor


	//Prototype
	jSpeed.Test.prototype = {
		//Properties
		$displayArea: null
	,	ua: null
		
		//Methods
	,	bindEvents: function()
		{
			$('#StartTest').bind('click',
				(function(){
					this.startTests();
				}).bind(this) //callback			
			);
		}//bindEvents
		
		
	,	startTests: function() {
			var coreResults,
				stringResults,
				domResults,
				animResults,
				totalRuns,
				markup = '',
				result;
			
			//Print the UA
			markup += '<h3 class="quiet">Your UA: '+ this.ua +'</h3>';
				
			//Test JS core
			coreResults = {}; //TODO: this

			//Test JS string manipulation
			stringResults = this.testStrings(5); //5ms allowed per test
			markup += this.printResultGroup(stringResults, "String", "5"); //current markup, test results, test title, test run time
			
			//Test JS Dom manipulation
			domResults = this.testDomManipulation(100); //time allowed per test
			markup += this.printResultGroup(domResults, "Dom Manipulation", "100"); //current markup, test results, test title, test run time
			
			//Test Animation
			animResults = {}; //TODO: this

			//Store the results in the database
			totalRuns = this.saveResults(this.ua, coreResults, stringResults, domResults, animResults);

			//Sum up the total
			markup += 	'<h2><strong> ' +
							(totalRuns) +
							'<span class="quiet"> -  Total Overall Score (in runs)</span>' +
						'</strong></h2>';
			$displayArea.html(markup);

		}//startTests


		//prints one of the result sets to the screen
	,	printResultGroup: function(results, testTitle, runTime) {
			var markup = '',
				sumRuns = 0;			
			
			markup += 	'<div class="quiet"><h3>'+ testTitle +' Tests (allowed '+ runTime +'ms each)</h3>';
			for (result in results) {
				sumRuns += results[result].runs;
				markup += 	'<p><strong>' +
								result +
							'</strong></p>' +
							results[result].hz + ' / second<br />' +
							results[result].runs + ' total runs';			
			}//for
			markup += 	'<p><strong>' +
							sumRuns +
							'</strong> -  Total '+ testTitle +' Score (in runs)' +
						'</p></div>';
		
			return markup;
		}//printResultGroup


		//Takes a ua and 4 result sets and stores the run count in the database for each, as well as the total
	,	saveResults: function(ua, core, string, dom, anim) {
			var coreRuns,
				stringRuns,
				domRuns,
				animRuns,
				totalRuns = 0;
		
			//count up runs for each of the test categories
			coreRuns = this.sumRuns(core);
			stringRuns = this.sumRuns(string);
			domRuns = this.sumRuns(dom);
			animRuns = this.sumRuns(anim);
			//Sum all categories together
			totalRuns = coreRuns + stringRuns + domRuns + animRuns;
			
			//Make the request to store to the database
			$.ajax({
				type: 'POST'
			,	url: 'save/testResult.php'
			,	data: {
					'ua': ua
				,	'coreRuns': coreRuns
				,	'stringRuns': stringRuns
				,	'domRuns': domRuns
				,	'animRuns': animRuns
				, 	'totalRuns': totalRuns
					}
			,	success: function(body) { console.log(body); }
			,	error: function(xhr, type) { console.log(type); console.log(xhr); }
			})

			return totalRuns;
		}//saveResults


	//,	makeStoreRequest: function()


		//takes a result object and returns the total runs for all tests in that test result object
	,	sumRuns: function(results) {
			var sum = 0;
			for (result in results) {
				sum += results[result].runs;
			}//for
			return sum;
		}//sumRuns


		//Test strings and count runs
		//understood inferior (but simple) method from: http://calendar.perfplanet.com/2010/bulletproof-javascript-benchmarks/
	,	testStrings: function(timeAllowed) {
			var hz,
				startTime,
				testString,
				runs,
				curTest,
				results = {};
			
			
			
			// -------------------------------- String Concat
			curTest = 'stringConcat';
			runs = 0;
			startTime = new Date();
			do {
				(function(){
				//---------------Test code start				
				testString = '';
				testString += 'hello' + ' code inspectors' + ' I also dislike' + ' dirty code';
				testString += 'this' + 'is' + 'another' + 'way';				
				//---------------Test code end
				})()		
				runs++;
				totalTime = new Date() - startTime;
			} while (totalTime < timeAllowed);
			// Compute runs per second
			hz = (runs * 1000) / totalTime;
			// Store result
			results[curTest] = {
				'hz': hz
			,	'runs': runs
			};
			
			
			
			// -------------------------------- Slice
			curTest = 'slice';
			runs = 0;
			startTime = new Date();	
			do {
				(function(){
				//---------------Test code start				
				testString = 'The rain in Spain stays mainly in the plain.'
				testString = testString.slice(0,-1);
				//---------------Test code end
				})()			
				runs++;
				totalTime = new Date() - startTime;
			} while (totalTime < timeAllowed);
			// Compute runs per second
			hz = (runs * 1000) / totalTime;
			// Store result
			results[curTest] = {
				'hz': hz
			,	'runs': runs
			};
			
			
			
			
			return results;
		}//testStrings


		//Test how fast the ua can manipulate the dom
	,	testDomManipulation: function(timeAllowed) {
			var hz,
				startTime,
				runs,
				curTest,
				elem,
				parent,
				results = {};



			// -------------------------------- Find by id, remove, add again
			curTest = 'FindById-Remove-Add';
			runs = 0;
			startTime = new Date();
			do {
				(function(){
				//---------------Test code start
				parent = document.getElementById('BogusMarkup');				
				elem = document.getElementById('Needle-EmailLink');
				elem.parentNode.removeChild(elem);
				parent.appendChild(elem);
				//---------------Test code end
				})()		
				runs++;
				totalTime = new Date() - startTime;
			} while (totalTime < timeAllowed);
			// Compute runs per second
			hz = (runs * 1000) / totalTime;
			// Store result
			results[curTest] = {
				'hz': hz
			,	'runs': runs
			};
		
		
		
			// -------------------------------- Find by class
			curTest = 'FindByClass';
			runs = 0;
			startTime = new Date();
			do {
				(function(){
				//---------------Test code start				
				var className = 'divideLeft',
					hasClassName = new RegExp("(?:^|\\s)" + className + "(?:$|\\s)"),
					allElements = document.getElementsByTagName("*"),
					searchResults = [],
					element,
					needle;
				
				for (var i = 0; (element = allElements[i]) != null; i++) {
					var elementClass = element.className;
					if (elementClass && elementClass.indexOf(className) != -1 && hasClassName.test(elementClass)) {
						searchResults.push(element);
						break;
					}
				}
				//---------------Test code end
				})()				
				runs++;
				totalTime = new Date() - startTime;
			} while (totalTime < timeAllowed);
			// Compute runs per second
			hz = (runs * 1000) / totalTime;
			// Store result
			results[curTest] = {
				'hz': hz
			,	'runs': runs
			};
		
		
		


			// -------------------------------- Find by id and add class
			curTest = 'AddClass';
			runs = 0;
			startTime = new Date();
			do {
				(function(){
				//---------------Test code start
				//get elem
				elem = document.getElementById('Needle-EmailLink');				
				//Now set the class
				elem.className += ' pickleJuice';
				//Reset it
				elem.className = 'link hasIcon';
				//---------------Test code end
				})()				
				runs++;
				totalTime = new Date() - startTime;
			} while (totalTime < timeAllowed);
			// Compute runs per second
			hz = (runs * 1000) / totalTime;
			// Store result
			results[curTest] = {
				'hz': hz
			,	'runs': runs
			};




		
			return results;
		}//testDomManipulation



	}; //prototype

})();