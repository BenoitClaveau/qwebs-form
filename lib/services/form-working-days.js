/*!
 * qwebs
 * Copyright(c) 2018 Benoît Claveau <benoit.claveau@gmail.com>
 * MIT Licensed
 */ 
const { Error, UndefinedError } = require("oups");
const moment = require("moment");


/*
Lundi de Pâques	2 Avril	22 Avril	-
Jeudi de l'Ascension
Assomption
L'Ascension = Pâques + 39 jours.
La Pentecôte = l'Ascension + 10 jours
*/

class WorkingDaysService {
  constructor() {
  };

  nonWorkingDays(country, year, options) {
    options = options || {};
    if (country != "fr") throw new Error("Only french working days are availabled.");

    var JourAn = new Date(year, "00", "01")
    var FeteTravail = new Date(year, "04", "01")
    var Victoire1945 = new Date(year, "04", "08")
    var FeteNationale = new Date(year,"06", "14")
    var Assomption = new Date(year, "07", "15")
    var Toussaint = new Date(year, "10", "01")
    var Armistice = new Date(year, "10", "11")
    var Noel = new Date(year, "11", "25")
    var SaintEtienne = new Date(year, "11", "26")
    var SaintSylvestre = new Date(year, "11", "31")
    
    var G = year%19
    var C = Math.floor(year/100)
    var H = (C - Math.floor(C/4) - Math.floor((8*C+13)/25) + 19*G + 15)%30
    var I = H - Math.floor(H/28)*(1 - Math.floor(H/28)*Math.floor(29/(H + 1))*Math.floor((21 - G)/11))
    var J = (year*1 + Math.floor(year/4) + I + 2 - C + Math.floor(C/4))%7
    var L = I - J
    
    var MoisPaques = 3 + Math.floor((L + 40)/44)
    var JourPaques = L + 28 - 31*Math.floor(MoisPaques/4)
    var Paques = new Date(year, MoisPaques-1, JourPaques)
    var VendrediSaint = new Date(year, MoisPaques-1, JourPaques-2)
    var LundiPaques = new Date(year, MoisPaques-1, JourPaques+1)
    var Ascension = new Date(year, MoisPaques-1, JourPaques+39)
    var Pentecote = new Date(year, MoisPaques-1, JourPaques+49)
    var LundiPentecote = new Date(year, MoisPaques-1, JourPaques+50);
    
    const joursFeriés = new Set([JourAn, Paques, LundiPaques, FeteTravail, Victoire1945, Ascension, Pentecote, LundiPentecote, FeteNationale, Assomption, Toussaint, Armistice, Noel]);
    if (options["Alsace-Moselle"]) {
      joursFeriés.add(VendrediSaint)
      joursFeriés.add(SaintEtienne)
    }
    
    let jour = JourAn;
    while(jour <= SaintSylvestre) {
      const d = jour.getDay();
      if ((d == 0 || d == 6) && !joursFeriés.has(jour)) joursFeriés.add(jour);
      jour = new Date(jour.getFullYear(), jour.getMonth(), jour.getDate() + 1);
    }

    return Array.from(joursFeriés).sort((a,b) => a - b);
  }

  workingTime(start, end) {
    end = end || moment();
    let coef = 1;
    if (start > end) { //invert dates
        const tmp = start;
        start = end;
        end = tmp;
        coef = -1;
    }

    let day = moment(start).startOf('day');
    let endDay = moment(end).startOf('day');
    let nonWorkingDays = this.nonWorkingDays(day.year()) //generate non working day calendar

    let startM = start.hours() * 60 + start.minutes();
    let endM = end.hours() * 60 + end.minutes();
    
    let duration = 0;

    while(endDay.diff(day) >= 0) {
      const dayJs = day.toDate(); 
      let work = !nonWorkingDays.some(e => e.getTime() == dayJs.getTime()); //is a working day ?
      
      if (work) {
        //Should be retrive in a calendar
        const opening = 9 * 60; //9h00
        const ending = 18 * 60; //10h00
        //startM = startM;
        //endM = endM

        if (endDay.diff(day) == 0) ending = Math.min(ending, endM);
        
        const workingStart = Math.min(Math.max(startM, opening), ending);
        duration += Math.max(ending - workingStart, 0);
      }
      startM = 0; //TODO delete this line if a calendar is used
      endM = 24;
      
      const nextday = moment(day).add(1, "day");
      if (nextday.year() != day.year()) nonWorkingDays = this.nonWorkingDays(nextday.year());
      day = nextday;
    }
   
    return coef * hours;
  }
}

exports = module.exports = WorkingDaysService;