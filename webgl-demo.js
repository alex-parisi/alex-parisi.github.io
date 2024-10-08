"use strict";

import { fs, vs } from './shader.js'
import { createProgramFromSources, resizeCanvasToDisplaySize } from './utils.js'

let opened = false;
let speedingUp = false;
let speedingDown = false;
let activeDeetz = "";
let juicyDeetz = "";
let miscJuicyDeetz = "";
let projectsOpen = false;
let miscOpen = false;

function speedUp(event) {
	speedingUp = true;
}

function hideThisElement(event) {
	const ele = document.getElementById(event.currentTarget.id);
	ele.hidden = true;
	ele.removeEventListener('animationend', hideThisElement);
}

function removeAllAnimations(target) {
	target.classList.remove("animate__animated", "animate__delay-0s", "animate__delay-1s", "animate__delay-2s", "animate__delay-3s",
							"animate__fadeIn", "animate__fadeInUp", "animate__fadeInDown", "animate__fadeInLeft", "animate__fadeInRight",
							"animate__fadeOut", "animate__fadeOutUp", "animate__fadeOutDown", "animate__fadeOutLeft", "animate__fadeOutRight");
}

function addButtonHandler(event) {
	const ele = document.getElementById(event.currentTarget.id);
	ele.removeEventListener('animationend', addButtonHandler);
	ele.addEventListener("click", buttonHandler);
}

function buttonHandler(event) {
	console.log(event.currentTarget.id);
	speedUp(event);
	if (!opened)
	{
		// Move the biz over
		opened = true;
		const biz = document.getElementById("the_biz");
		biz.style.transform = `translateX(-112.5%)`;
		// Open the correct deetz
		let deetz = document.getElementById("experience_deetz"); // Initialize with experience
		if (event.currentTarget.id == "experience_button") { deetz = document.getElementById("experience_deetz"); activeDeetz = "experience"; removeAllAnimations(deetz); deetz.classList.add("animate__animated", "animate__fadeIn", "animate__delay-1s"); deetz.hidden = false; }
		else if (event.currentTarget.id == "education_button") { deetz = document.getElementById("education_deetz"); activeDeetz = "education"; deetz.hidden = false; removeAllAnimations(deetz); deetz.classList.add("animate__animated", "animate__fadeIn", "animate__delay-1s"); }
		else if (event.currentTarget.id == "skills_button") { deetz = document.getElementById("skills_deetz"); activeDeetz = "skills"; deetz.hidden = false; removeAllAnimations(deetz); deetz.classList.add("animate__animated", "animate__fadeIn", "animate__delay-1s"); }
		else if (event.currentTarget.id == "patents_button") { deetz = document.getElementById("patents_deetz"); activeDeetz = "patents"; deetz.hidden = false; removeAllAnimations(deetz); deetz.classList.add("animate__animated", "animate__fadeIn", "animate__delay-1s"); }
		// Special case for the projects button:
		else if (event.currentTarget.id == "projects_button") 
		{ 
			deetz = document.getElementById("projects_deetz"); 
			deetz.hidden = false;
			// Add the fadeout animation to the biz:
			removeAllAnimations(biz);
			biz.classList.add("animate__animated", "animate__fadeOut", "animate__delay-1s");
			// Add a function to hide the biz when it's done fading 
			biz.addEventListener('animationend', hideThisElement);
			// Add the fadeIn animation to the project deetz:
			removeAllAnimations(deetz);
			deetz.classList.add("animate__animated", "animate__fadeIn", "animate__delay-1s");
			projectsOpen = true;
			activeDeetz = "";
			// Also activate the projects0 deetz page:
			const deetz0 = document.getElementById("projects0_deetz");
			removeAllAnimations(deetz0);
			deetz0.classList.add("animate__animated", "animate__fadeIn", "animate__delay-1s");
			deetz0.hidden = false;
			juicyDeetz = "projects0";
		}
		// Special case for the misc button:
		else if (event.currentTarget.id == "misc_button") 
		{ 
			deetz = document.getElementById("misc_deetz"); 
			deetz.hidden = false;
			// Add the fadeout animation to the biz:
			removeAllAnimations(biz);
			biz.classList.add("animate__animated", "animate__fadeOut", "animate__delay-1s");
			// Add a function to hide the biz when it's done fading
			biz.addEventListener('animationend', hideThisElement);
			// Add the fadeIn animation to the project deetz:
			removeAllAnimations(deetz);
			deetz.classList.add("animate__animated", "animate__fadeIn", "animate__delay-1s");
			miscOpen = true;
			activeDeetz = "";
		}
	}
	else
	{
		// Check to see if it's a return to menu button from projects:
		if (event.currentTarget.id == "projectsMainMenu_button")
		{
			projectsOpen = false;
			// Projects menu is open
			const biz = document.getElementById("the_biz");
			let deetz = document.getElementById("projects_deetz");
			// If there is a juicy deetz open, fade that out first:
			if (juicyDeetz != "")
			{
				let jDeetz = document.getElementById("projects0_deetz");
				if (juicyDeetz == "projects0") { jDeetz = document.getElementById("projects0_deetz"); removeAllAnimations(jDeetz); jDeetz.classList.add("animate__animated", "animate__fadeOutUp"); juicyDeetz = ""; }
				else if (juicyDeetz == "projects1") { jDeetz = document.getElementById("projects1_deetz"); removeAllAnimations(jDeetz); jDeetz.classList.add("animate__animated", "animate__fadeOutUp"); juicyDeetz = ""; }
				else if (juicyDeetz == "projects2") { jDeetz = document.getElementById("projects2_deetz"); removeAllAnimations(jDeetz); jDeetz.classList.add("animate__animated", "animate__fadeOutUp"); juicyDeetz = ""; }
				else if (juicyDeetz == "projects3") { jDeetz = document.getElementById("projects3_deetz"); removeAllAnimations(jDeetz); jDeetz.classList.add("animate__animated", "animate__fadeOutUp"); juicyDeetz = ""; }
				else if (juicyDeetz == "projects4") { jDeetz = document.getElementById("projects4_deetz"); removeAllAnimations(jDeetz); jDeetz.classList.add("animate__animated", "animate__fadeOutUp"); juicyDeetz = ""; }
				else if (juicyDeetz == "projects5") { jDeetz = document.getElementById("projects5_deetz"); removeAllAnimations(jDeetz); jDeetz.classList.add("animate__animated", "animate__fadeOutUp"); juicyDeetz = ""; }
				else if (juicyDeetz == "projects6") { jDeetz = document.getElementById("projects6_deetz"); removeAllAnimations(jDeetz); jDeetz.classList.add("animate__animated", "animate__fadeOutUp"); juicyDeetz = ""; }
				else if (juicyDeetz == "projects7") { jDeetz = document.getElementById("projects7_deetz"); removeAllAnimations(jDeetz); jDeetz.classList.add("animate__animated", "animate__fadeOutUp"); juicyDeetz = ""; }
			}
			// Fade out the projects deetz:
			removeAllAnimations(deetz);
			deetz.classList.add("animate__animated", "animate__fadeOut", "animate__delay-1s");
			// Add a function to hide the deetz when it's done fading:
			deetz.addEventListener('animationend', hideThisElement);
			// Fade in the biz:
			removeAllAnimations(biz);
			biz.classList.add("animate__animated", "animate__fadeIn", "animate__delay-1s");
			biz.hidden = false;
			biz.style.transform = `translateX(0%)`;
			opened = false;
			activeDeetz = "";
		}
		// Check to see if it's a return to menu button from misc:
		else if (event.currentTarget.id == "miscMainMenu_button")
		{
			miscOpen = false;
			// Misc menu is open
			const biz = document.getElementById("the_biz");
			let deetz = document.getElementById("misc_deetz");
			// If there is a misc juicy deetz open, fade that out first:
			if (miscJuicyDeetz != "")
			{

			}
			// Then fade out the misc deetz:
			removeAllAnimations(deetz);
			deetz.classList.add("animate__animated", "animate__fadeOut", "animate__delay-1s");
			// Add function to hide the misc deetz when it's done fading:
			deetz.addEventListener('animationend', hideThisElement);
			// Fade in the biz:
			removeAllAnimations(biz);
			biz.classList.add("animate__animated", "animate__fadeIn", "animate__delay-1s");
			biz.hidden = false;
			biz.style.transform = `translateX(0%)`;
			opened = false;
			activeDeetz = "";
		}
		else if (event.currentTarget.id.startsWith("projectDeetz"))
		{
			// A project button has been pressed:
			// Fade out the juicy deetz:
			let proDeetz = document.getElementById("projects0_deetz");
			if (juicyDeetz == "projects0") { proDeetz = document.getElementById("projects0_deetz"); }
			else if (juicyDeetz == "projects1") { proDeetz = document.getElementById("projects1_deetz"); }
			else if (juicyDeetz == "projects2") { proDeetz = document.getElementById("projects2_deetz"); }
			else if (juicyDeetz == "projects3") { proDeetz = document.getElementById("projects3_deetz"); }
			else if (juicyDeetz == "projects4") { proDeetz = document.getElementById("projects4_deetz"); }
			else if (juicyDeetz == "projects5") { proDeetz = document.getElementById("projects5_deetz"); }
			else if (juicyDeetz == "projects6") { proDeetz = document.getElementById("projects6_deetz"); }
			else if (juicyDeetz == "projects7") { proDeetz = document.getElementById("projects7_deetz"); }
			removeAllAnimations(proDeetz);
			proDeetz.classList.add("animate__animated", "animate__fadeOutUp");
			// Fade in the new juicy deetz:
			let deetz = document.getElementById("projects0_deetz");
			if (event.currentTarget.id == "projectDeetz1_button") { deetz = document.getElementById("projects1_deetz"); juicyDeetz = "projects1"; }
			else if (event.currentTarget.id == "projectDeetz2_button") { deetz = document.getElementById("projects2_deetz"); juicyDeetz = "projects2"; }
			else if (event.currentTarget.id == "projectDeetz3_button") { deetz = document.getElementById("projects3_deetz"); juicyDeetz = "projects3"; }
			else if (event.currentTarget.id == "projectDeetz4_button") { deetz = document.getElementById("projects4_deetz"); juicyDeetz = "projects4"; }
			else if (event.currentTarget.id == "projectDeetz5_button") { deetz = document.getElementById("projects5_deetz"); juicyDeetz = "projects5"; }
			else if (event.currentTarget.id == "projectDeetz6_button") { deetz = document.getElementById("projects6_deetz"); juicyDeetz = "projects6"; }
			else if (event.currentTarget.id == "projectDeetz7_button") { deetz = document.getElementById("projects7_deetz"); juicyDeetz = "projects7"; }
			removeAllAnimations(deetz);
			deetz.classList.add("animate__animated", "animate__fadeInRight"); 
			deetz.hidden = false;
			deetz.scrollTop = 0;
		}
		else
		{
			// Just update the information being displayed
			// First fade out the current deetz
			// This is done by removing all animation styles from it, then reattaching the fadeOut animations.
			// This should restart the animation and fade it out.
			// Grab the deetz:
			let deetz = document.getElementById("experience_deetz"); // Initialize with experience
			if (activeDeetz == "experience") { deetz = document.getElementById("experience_deetz"); }
			else if (activeDeetz == "education") { deetz = document.getElementById("education_deetz"); }
			else if (activeDeetz == "skills") { deetz = document.getElementById("skills_deetz"); }
			else if (activeDeetz == "patents") { deetz = document.getElementById("patents_deetz"); }
			// Remove all animation styles from the deetz:
			removeAllAnimations(deetz);
			// Add in the fade out:
			deetz.classList.add("animate__animated", "animate__fadeOutUp")
			// Now grab the new deetz:
			deetz = document.getElementById("experience_deetz"); // Initialize with experience
			if (event.currentTarget.id == "experience_button") { deetz = document.getElementById("experience_deetz"); activeDeetz = "experience"; deetz.classList.remove("animate__animated", "animate__fadeInRight", "animate__fadeOutUp", "animate__delay-1s", "animate__slow"); deetz.classList.add("animate__animated", "animate__fadeInRight"); deetz.hidden = false; }
			else if (event.currentTarget.id == "education_button") { deetz = document.getElementById("education_deetz"); activeDeetz = "education"; deetz.classList.remove("animate__animated", "animate__fadeInRight", "animate__fadeOutUp", "animate__delay-1s", "animate__slow"); deetz.classList.add("animate__animated", "animate__fadeInRight"); deetz.hidden = false; }
			else if (event.currentTarget.id == "skills_button") { deetz = document.getElementById("skills_deetz"); activeDeetz = "skills"; deetz.classList.remove("animate__animated", "animate__fadeInRight", "animate__fadeOutUp", "animate__delay-1s", "animate__slow"); deetz.classList.add("animate__animated", "animate__fadeInRight"); deetz.hidden = false; }
			else if (event.currentTarget.id == "patents_button") { deetz = document.getElementById("patents_deetz"); activeDeetz = "patents"; deetz.classList.remove("animate__animated", "animate__fadeInRight", "animate__fadeOutUp", "animate__delay-1s", "animate__slow"); deetz.classList.add("animate__animated", "animate__fadeInRight"); deetz.hidden = false; }
			// Special case when the projects button is pressed:
			else if (event.currentTarget.id == "projects_button") 
			{ 
				const biz = document.getElementById("the_biz");
				deetz = document.getElementById("projects_deetz"); 
				// Add the fadeout animation to the biz:
				removeAllAnimations(biz)
				biz.classList.add("animate__animated", "animate__fadeOut", "animate__delay-1s");
				// Add the fadeIn animation to the project deetz:
				removeAllAnimations(deetz);
				deetz.classList.add("animate__animated", "animate__fadeIn", "animate__delay-1s");
				deetz.hidden = false;
				projectsOpen = true;
				// Also fade in the projects0 deetz:
				// Also activate the projects0 deetz page:
				const deetz0 = document.getElementById("projects0_deetz");
				removeAllAnimations(deetz0);
				deetz0.classList.add("animate__animated", "animate__fadeIn", "animate__delay-1s");
				deetz0.hidden = false;
				juicyDeetz = "projects0";
			}
			// Special case when the misc button is pressed:
			else if (event.currentTarget.id == "misc_button") 
			{ 
				const biz = document.getElementById("the_biz");
				deetz = document.getElementById("misc_deetz"); 
				// Add the fadeout animation to the biz:
				removeAllAnimations(biz);
				biz.classList.add("animate__animated", "animate__fadeOut", "animate__delay-1s");
				// Add the fadeIn animation to the project deetz:
				removeAllAnimations(deetz);
				deetz.classList.add("animate__animated", "animate__fadeIn", "animate__delay-1s");
				deetz.hidden = false;
				miscOpen = true;
			}
		}
	}
}

function main() {

	// Get A WebGL context
	/** @type {HTMLCanvasElement} */
	const canvas = document.querySelector("#glcanvas");
	const gl = canvas.getContext("webgl");
	if (!gl) {
		return;
	}
	canvas.width = document.body.clientWidth;
	canvas.height = document.body.clientHeight;
	
	// Setup some HTML stuff
	const biz = document.getElementById("the_biz");

	const experience_deetz = document.getElementById("experience_deetz");
	const education_deetz = document.getElementById("education_deetz");
	const projects_deetz = document.getElementById("projects_deetz");
	const skills_deetz = document.getElementById("skills_deetz");
	const patents_deetz = document.getElementById("patents_deetz");
	const misc_deetz = document.getElementById("misc_deetz");

	const projects0_deetz = document.getElementById("projects0_deetz");
	const projects1_deetz = document.getElementById("projects1_deetz");
	const projects2_deetz = document.getElementById("projects2_deetz");
	const projects3_deetz = document.getElementById("projects3_deetz");
	const projects4_deetz = document.getElementById("projects4_deetz");
	const projects5_deetz = document.getElementById("projects5_deetz");
	const projects6_deetz = document.getElementById("projects6_deetz");
	const projects7_deetz = document.getElementById("projects7_deetz");

	const exp_btn = document.getElementById("experience_button");
	const edu_btn = document.getElementById("education_button");
	const pro_btn = document.getElementById("projects_button");
	const ski_btn = document.getElementById("skills_button");
	const pat_btn = document.getElementById("patents_button");
	const msc_btn = document.getElementById("misc_button");

	const pro_mm_btn = document.getElementById("projectsMainMenu_button");
	const msc_mm_btn = document.getElementById("miscMainMenu_button");

	const pro1_btn = document.getElementById("projectDeetz1_button");
	const pro2_btn = document.getElementById("projectDeetz2_button");
	const pro3_btn = document.getElementById("projectDeetz3_button");
	const pro4_btn = document.getElementById("projectDeetz4_button");
	const pro5_btn = document.getElementById("projectDeetz5_button");
	const pro6_btn = document.getElementById("projectDeetz6_button");
	const pro7_btn = document.getElementById("projectDeetz7_button");

	const resume_btn = document.getElementById("resume_button");
	const linkedin_btn = document.getElementById("linkedin_button");
	const github_btn = document.getElementById("github_button");
	const email_btn = document.getElementById("email_button");

	const miku_exp = document.getElementById("miku_exp");
	const peraton_exp = document.getElementById("peraton_exp");
	const crestron_exp = document.getElementById("crestron_exp");

	const h31 = document.getElementById("h31");
	const h32 = document.getElementById("h32");
	const h33 = document.getElementById("h33");

	const h41 = document.getElementById("h41");
	const h42 = document.getElementById("h42");
	const h43 = document.getElementById("h43");
	const h44 = document.getElementById("h44");
	const h45 = document.getElementById("h45");
	const h46 = document.getElementById("h46");

	const h51 = document.getElementById("h51");
	const h52 = document.getElementById("h52");
	const h53 = document.getElementById("h53");
	const h54 = document.getElementById("h54");

	const h61 = document.getElementById("h61");
	const h62 = document.getElementById("h62");
	const h63 = document.getElementById("h63");
	const h64 = document.getElementById("h64");
	const h65 = document.getElementById("h65");
	const h66 = document.getElementById("h66");
	const h67 = document.getElementById("h67");
	const h68 = document.getElementById("h68");
	const h69 = document.getElementById("h69");
	const h610 = document.getElementById("h610");
	const h611 = document.getElementById("h611");
	const h612 = document.getElementById("h612");
	const h613 = document.getElementById("h613");
	const h614 = document.getElementById("h614");
	const h615 = document.getElementById("h615");
	const h616 = document.getElementById("h616");
	const h617 = document.getElementById("h617");
	const h618 = document.getElementById("h618");

	const paper1 = document.getElementById("paper1");
	const paper2 = document.getElementById("paper2");
	const paper3 = document.getElementById("paper3");
	const paper4 = document.getElementById("paper4");
	const paper5 = document.getElementById("paper5");
	const paper6 = document.getElementById("paper6");

	const paper1_cont = document.getElementById("paper1_cont");
	const paper2_cont = document.getElementById("paper2_cont");
	const paper3_cont = document.getElementById("paper3_cont");
	const paper4_cont = document.getElementById("paper4_cont");
	const paper5_cont = document.getElementById("paper5_cont");
	const paper6_cont = document.getElementById("paper6_cont");

	const programming_skills = document.getElementById("programming_skills");
	const software_skills = document.getElementById("software_skills");
	const general_skills = document.getElementById("general_skills");
	const patent_number = document.getElementById("patent_number");

	exp_btn.style.fontSize = 1.5 * (window.innerWidth / 2048.0) * (window.innerHeight / 991.0) + "em";
	edu_btn.style.fontSize = 1.5 * (window.innerWidth / 2048.0) * (window.innerHeight / 991.0) + "em";
	pro_btn.style.fontSize = 1.5 * (window.innerWidth / 2048.0) * (window.innerHeight / 991.0) + "em";
	ski_btn.style.fontSize = 1.5 * (window.innerWidth / 2048.0) * (window.innerHeight / 991.0) + "em";
	pat_btn.style.fontSize = 1.5 * (window.innerWidth / 2048.0) * (window.innerHeight / 991.0) + "em";
	msc_btn.style.fontSize = 1.5 * (window.innerWidth / 2048.0) * (window.innerHeight / 991.0) + "em";

	pro_mm_btn.style.fontSize = 1.5 * (window.innerWidth / 2048.0) + "em";
	msc_mm_btn.style.fontSize = 1.5 * (window.innerWidth / 2048.0) + "em";

	pro1_btn.style.fontSize = 1.0 * (window.innerWidth / 2048.0) + "em";
	pro2_btn.style.fontSize = 1.0 * (window.innerWidth / 2048.0) + "em";
	pro3_btn.style.fontSize = 1.0 * (window.innerWidth / 2048.0) + "em";
	pro4_btn.style.fontSize = 1.0 * (window.innerWidth / 2048.0) + "em";
	pro5_btn.style.fontSize = 1.0 * (window.innerWidth / 2048.0) + "em";
	pro6_btn.style.fontSize = 1.0 * (window.innerWidth / 2048.0) + "em";
	pro7_btn.style.fontSize = 1.0 * (window.innerWidth / 2048.0) + "em";

	resume_btn.style.fontSize = 1.0 * (window.innerWidth / 2048.0) + "em";
	linkedin_btn.style.fontSize = 1.0 * (window.innerWidth / 2048.0) + "em";
	github_btn.style.fontSize = 1.0 * (window.innerWidth / 2048.0) + "em";
	email_btn.style.fontSize = 1.0 * (window.innerWidth / 2048.0) + "em";

	h31.style.fontSize = 24.0 * (window.innerHeight / 991.0) + "px";
	h32.style.fontSize = 24.0 * (window.innerHeight / 991.0) + "px";
	h33.style.fontSize = 24.0 * (window.innerHeight / 991.0) + "px";

	h41.style.fontSize = 20.0 * (window.innerHeight / 991.0) + "px";
	h42.style.fontSize = 20.0 * (window.innerHeight / 991.0) + "px";
	h43.style.fontSize = 20.0 * (window.innerHeight / 991.0) + "px";
	h44.style.fontSize = 20.0 * (window.innerHeight / 991.0) + "px";
	h45.style.fontSize = 20.0 * (window.innerHeight / 991.0) + "px";
	h46.style.fontSize = 20.0 * (window.innerHeight / 991.0) + "px";

	h51.style.fontSize = 18.0 * (window.innerHeight / 991.0) + "px";
	h52.style.fontSize = 18.0 * (window.innerHeight / 991.0) + "px";
	h53.style.fontSize = 18.0 * (window.innerHeight / 991.0) + "px";
	h54.style.fontSize = 18.0 * (window.innerHeight / 991.0) + "px";
	
	h61.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
	h62.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
	h63.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
	h64.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
	h65.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
	h66.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
	h67.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
	h68.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
	h69.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
	h610.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
	h611.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
	h612.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
	h613.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
	h614.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
	h615.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
	h616.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
	h617.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
	h618.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";

	miku_exp.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";
	peraton_exp.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";
	crestron_exp.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";

	paper1.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";
	paper2.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";
	paper3.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";
	paper4.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";
	paper5.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";
	paper6.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";

	programming_skills.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";
	software_skills.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";
	general_skills.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";
	patent_number.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";

	experience_deetz.style.height = biz.clientHeight.toString().concat("px");
	education_deetz.style.height = biz.clientHeight.toString().concat("px");
	skills_deetz.style.height = biz.clientHeight.toString().concat("px");
	patents_deetz.style.height = biz.clientHeight.toString().concat("px");
	misc_deetz.style.height = biz.clientHeight.toString().concat("px");

	projects0_deetz.style.height = biz.clientHeight.toString().concat("px");
	projects1_deetz.style.height = biz.clientHeight.toString().concat("px");
	projects2_deetz.style.height = biz.clientHeight.toString().concat("px");
	projects3_deetz.style.height = biz.clientHeight.toString().concat("px");
	projects4_deetz.style.height = biz.clientHeight.toString().concat("px");
	projects5_deetz.style.height = biz.clientHeight.toString().concat("px");
	projects6_deetz.style.height = biz.clientHeight.toString().concat("px");
	projects7_deetz.style.height = biz.clientHeight.toString().concat("px");

	miku_exp.style.height = 250.0 * (window.innerHeight / 991.0) * (window.innerWidth / 2048.0) + "px";
	peraton_exp.style.height = 250.0 * (window.innerHeight / 991.0) * (window.innerWidth / 2048.0) + "px";
	crestron_exp.style.height = 250.0 * (window.innerHeight / 991.0) * (window.innerWidth / 2048.0) + "px";

	paper1_cont.style.height = 200.0 * (window.innerHeight / 991.0) * (window.innerWidth / 2048.0) + "px";
	paper2_cont.style.height = 200.0 * (window.innerHeight / 991.0) * (window.innerWidth / 2048.0) + "px";
	paper3_cont.style.height = 200.0 * (window.innerHeight / 991.0) * (window.innerWidth / 2048.0) + "px";
	paper4_cont.style.height = 200.0 * (window.innerHeight / 991.0) * (window.innerWidth / 2048.0) + "px";
	paper5_cont.style.height = 200.0 * (window.innerHeight / 991.0) * (window.innerWidth / 2048.0) + "px";
	paper6_cont.style.height = 200.0 * (window.innerHeight / 991.0) * (window.innerWidth / 2048.0) + "px";
	
	experience_deetz.hidden = true;
	education_deetz.hidden = true;
	projects_deetz.hidden = true;
	skills_deetz.hidden = true;
	patents_deetz.hidden = true;
	misc_deetz.hidden = true;

	projects0_deetz.hidden = true;
	projects1_deetz.hidden = true;
	projects2_deetz.hidden = true;
	projects3_deetz.hidden = true;
	projects4_deetz.hidden = true;
	projects5_deetz.hidden = true;
	projects6_deetz.hidden = true;
	projects7_deetz.hidden = true;

	exp_btn.addEventListener('animationend', addButtonHandler);
	edu_btn.addEventListener('animationend', addButtonHandler);
	pro_btn.addEventListener('animationend', addButtonHandler);
	ski_btn.addEventListener('animationend', addButtonHandler);
	pat_btn.addEventListener('animationend', addButtonHandler);
	msc_btn.addEventListener('animationend', addButtonHandler);

	pro_mm_btn.addEventListener('animationend', addButtonHandler);
	msc_mm_btn.addEventListener('animationend', addButtonHandler);

	pro1_btn.addEventListener('animationend', addButtonHandler);
	pro2_btn.addEventListener('animationend', addButtonHandler);
	pro3_btn.addEventListener('animationend', addButtonHandler);
	pro4_btn.addEventListener('animationend', addButtonHandler);
	pro5_btn.addEventListener('animationend', addButtonHandler);
	pro6_btn.addEventListener('animationend', addButtonHandler);
	pro7_btn.addEventListener('animationend', addButtonHandler);

	paper1.scrollTop = 0;
	paper2.scrollTop = 0;
	paper3.scrollTop = 0;
	paper4.scrollTop = 0;
	paper5.scrollTop = 0;
	paper6.scrollTop = 0;

	miku_exp.scrollTop = 0;
	peraton_exp.scrollTop = 0;
	crestron_exp.scrollTop = 0;

	// Setup GLSL program
	const program = createProgramFromSources(gl, [vs, fs]);
	// Get vertex position data
	const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
	// Get uniform locations
	const resolutionLocation = gl.getUniformLocation(program, "iResolution");
	const mouseLocation = gl.getUniformLocation(program, "iMouse");
	const timeLocation = gl.getUniformLocation(program, "iTime");
	const timeScalingLocation = gl.getUniformLocation(program, "timeScaling");
	// Create a buffer to put three 2d clip space points in
	const positionBuffer = gl.createBuffer();
	// Bind it to ARRAY_BUFFER
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	// Fill it with 2 triangles
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
		// T1
		-1, -1, // v1
		 1, -1, // v2
		-1,  1, // v3
		// T2
		-1,  1, // v1
		 1, -1, // v2
		 1,  1, // v3
	]), gl.STATIC_DRAW);

	// Track mouse movements
	const inputElem = document.querySelector('.divcanvas');
	let mouseX = 0;
	let mouseY = 0;
	function setMousePosition(e) {
		const rect = inputElem.getBoundingClientRect();
		mouseX = e.clientX - rect.left;
		mouseY = rect.height - (e.clientY - rect.top) - 1;
	}
	inputElem.addEventListener('mousemove', setMousePosition);

	// Create function to request next frame for animation
	let requestId;
	function requestFrame() {
		if (!requestId) {
			requestId = requestAnimationFrame(render);
		}
	}

	// Set this function to be called on load and when the window is resized
	window.onresize = function () {
		canvas.width = document.body.clientWidth;
		canvas.height = document.body.clientHeight;

		exp_btn.style.fontSize = 1.5 * (window.innerWidth / 2048.0) * (window.innerHeight / 991.0) + "em";
		edu_btn.style.fontSize = 1.5 * (window.innerWidth / 2048.0) * (window.innerHeight / 991.0) + "em";
		pro_btn.style.fontSize = 1.5 * (window.innerWidth / 2048.0) * (window.innerHeight / 991.0) + "em";
		ski_btn.style.fontSize = 1.5 * (window.innerWidth / 2048.0) * (window.innerHeight / 991.0) + "em";
		pat_btn.style.fontSize = 1.5 * (window.innerWidth / 2048.0) * (window.innerHeight / 991.0) + "em";
		msc_btn.style.fontSize = 1.5 * (window.innerWidth / 2048.0) * (window.innerHeight / 991.0) + "em";

		pro_mm_btn.style.fontSize = 1.5 * (window.innerWidth / 2048.0) + "em";
		msc_mm_btn.style.fontSize = 1.5 * (window.innerWidth / 2048.0) + "em";

		pro1_btn.style.fontSize = 1.0 * (window.innerWidth / 2048.0) + "em";
		pro2_btn.style.fontSize = 1.0 * (window.innerWidth / 2048.0) + "em";
		pro3_btn.style.fontSize = 1.0 * (window.innerWidth / 2048.0) + "em";
		pro4_btn.style.fontSize = 1.0 * (window.innerWidth / 2048.0) + "em";
		pro5_btn.style.fontSize = 1.0 * (window.innerWidth / 2048.0) + "em";
		pro6_btn.style.fontSize = 1.0 * (window.innerWidth / 2048.0) + "em";
		pro7_btn.style.fontSize = 1.0 * (window.innerWidth / 2048.0) + "em";

		resume_btn.style.fontSize = 1.0 * (window.innerWidth / 2048.0) + "em";
		linkedin_btn.style.fontSize = 1.0 * (window.innerWidth / 2048.0) + "em";
		github_btn.style.fontSize = 1.0 * (window.innerWidth / 2048.0) + "em";
		email_btn.style.fontSize = 1.0 * (window.innerWidth / 2048.0) + "em";

		h31.style.fontSize = 24.0 * (window.innerHeight / 991.0) + "px";
		h32.style.fontSize = 24.0 * (window.innerHeight / 991.0) + "px";
		h33.style.fontSize = 24.0 * (window.innerHeight / 991.0) + "px";
	
		h41.style.fontSize = 20.0 * (window.innerHeight / 991.0) + "px";
		h42.style.fontSize = 20.0 * (window.innerHeight / 991.0) + "px";
		h43.style.fontSize = 20.0 * (window.innerHeight / 991.0) + "px";
		h44.style.fontSize = 20.0 * (window.innerHeight / 991.0) + "px";
		h45.style.fontSize = 20.0 * (window.innerHeight / 991.0) + "px";
		h46.style.fontSize = 20.0 * (window.innerHeight / 991.0) + "px";
	
		h51.style.fontSize = 18.0 * (window.innerHeight / 991.0) + "px";
		h52.style.fontSize = 18.0 * (window.innerHeight / 991.0) + "px";
		h53.style.fontSize = 18.0 * (window.innerHeight / 991.0) + "px";
		h54.style.fontSize = 18.0 * (window.innerHeight / 991.0) + "px";
		
		h61.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
		h62.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
		h63.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
		h64.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
		h65.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
		h66.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
		h67.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
		h68.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
		h69.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
		h610.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
		h611.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
		h612.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
		h613.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
		h614.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
		h615.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
		h616.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
		h617.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";
		h618.style.fontSize = 16.0 * (window.innerHeight / 991.0) + "px";

		miku_exp.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";
		peraton_exp.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";
		crestron_exp.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";

		paper1.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";
		paper2.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";
		paper3.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";
		paper4.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";
		paper5.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";
		paper6.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";

		miku_exp.style.height = 250.0 * (window.innerHeight / 991.0) * (window.innerWidth / 2048.0) + "px";
		peraton_exp.style.height = 250.0 * (window.innerHeight / 991.0) * (window.innerWidth / 2048.0) + "px";
		crestron_exp.style.height = 250.0 * (window.innerHeight / 991.0) * (window.innerWidth / 2048.0) + "px";

		paper1_cont.style.height = 200.0 * (window.innerHeight / 991.0) * (window.innerWidth / 2048.0) + "px";
		paper2_cont.style.height = 200.0 * (window.innerHeight / 991.0) * (window.innerWidth / 2048.0) + "px";
		paper3_cont.style.height = 200.0 * (window.innerHeight / 991.0) * (window.innerWidth / 2048.0) + "px";
		paper4_cont.style.height = 200.0 * (window.innerHeight / 991.0) * (window.innerWidth / 2048.0) + "px";
		paper5_cont.style.height = 200.0 * (window.innerHeight / 991.0) * (window.innerWidth / 2048.0) + "px";
		paper6_cont.style.height = 200.0 * (window.innerHeight / 991.0) * (window.innerWidth / 2048.0) + "px";

		programming_skills.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";
		software_skills.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";
		general_skills.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";
		patent_number.style.fontSize = 1.0 * (window.innerHeight / 991.0) + "em";

		if ((activeDeetz != "") || (!opened))
		{
			experience_deetz.style.height = biz.clientHeight.toString().concat("px");
			education_deetz.style.height = biz.clientHeight.toString().concat("px");
			skills_deetz.style.height = biz.clientHeight.toString().concat("px");
			patents_deetz.style.height = biz.clientHeight.toString().concat("px");
			misc_deetz.style.height = biz.clientHeight.toString().concat("px");
			projects0_deetz.style.height = biz.clientHeight.toString().concat("px");
			projects1_deetz.style.height = biz.clientHeight.toString().concat("px");
			projects2_deetz.style.height = biz.clientHeight.toString().concat("px");
			projects3_deetz.style.height = biz.clientHeight.toString().concat("px");
			projects4_deetz.style.height = biz.clientHeight.toString().concat("px");
			projects5_deetz.style.height = biz.clientHeight.toString().concat("px");
			projects6_deetz.style.height = biz.clientHeight.toString().concat("px");
			projects7_deetz.style.height = biz.clientHeight.toString().concat("px");
		}
		else
		{
			projects0_deetz.style.height = projects_deetz.clientHeight.toString().concat("px");
			projects1_deetz.style.height = projects_deetz.clientHeight.toString().concat("px");
			projects2_deetz.style.height = projects_deetz.clientHeight.toString().concat("px");
			projects3_deetz.style.height = projects_deetz.clientHeight.toString().concat("px");
			projects4_deetz.style.height = projects_deetz.clientHeight.toString().concat("px");
			projects5_deetz.style.height = projects_deetz.clientHeight.toString().concat("px");
			projects6_deetz.style.height = projects_deetz.clientHeight.toString().concat("px");
			projects7_deetz.style.height = projects_deetz.clientHeight.toString().concat("px");
		}

		requestFrame();
	}

	// Setup a render loop:
	let then = 0;
	let time = Math.random() * 1000;
	let timeScalingVar = 0.025;
	function render(now) {
		gl.clearColor((100.0 / 255.0), (153.0 / 255.0), (233.0 / 255.0), 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		const enable_button = document.getElementById("enable_btn");
		// If speedingUp is true, mess with the value:
		if (speedingUp)
		{
			if (!speedingDown)
			{
				timeScalingVar += 0.0035;
				if (timeScalingVar > 0.5)
				{
					timeScalingVar = 0.5;
					speedingDown = true;
				}
			}
			else
			{
				timeScalingVar -= 0.0035;
				if (timeScalingVar < 0.025)
				{
					timeScalingVar = 0.025;
					speedingDown = false;
					speedingUp = false;
				}
			}
		}
		requestId = undefined;
		// Calculate elapsed time since last render
		now *= 0.001; // Convert to seconds
		const elapsedTime = Math.min(now - then, 0.1);
		time += elapsedTime * timeScalingVar;
		then = now;
		// Ensure the canvas is the correct size
		resizeCanvasToDisplaySize(gl.canvas);
		// Establish a viewport
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
		// Use the WebGL program
		gl.useProgram(program);
		gl.enableVertexAttribArray(positionAttributeLocation);
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
		gl.vertexAttribPointer(
			positionAttributeLocation,
			2,          // 2 components per iteration
			gl.FLOAT,   // the data is 32bit floats
			false,      // don't normalize the data
			0,          // 0 = move forward size * sizeof(type) each iteration to get the next position
			0,          // start at the beginning of the buffer
		);
		gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
		// Fix the mouse location at the center (TEMP TO - DO)
		mouseX = canvas.width / 2;
		mouseY = canvas.height / 2;
		// Bind the mouse location and elapsed time
		gl.uniform2f(mouseLocation, mouseX, mouseY);
		gl.uniform1f(timeLocation, time);
		gl.uniform1f(timeScalingLocation, timeScalingVar);
		// Draw the scene:
		if (enable_button.checked) {
			gl.drawArrays(
				gl.TRIANGLES,
				0,     // offset
				6,     // num vertices to process
			);
		}
		// Continue loop:
		requestFrame();
	}
	// Start render loop:
	requestFrame();
}

main();
