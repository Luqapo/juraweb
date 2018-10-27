const express = require('express')
const fs = require('fs');
const mongoose = require('mongoose');

const Rejon = require('./models/Rejon');
const Skala = require('./models/Skala');
const Droga = require('./models/Droga');

const uri = 'mongodb://Luq:Haslo1@cluster0-shard-00-00-gw1sh.mongodb.net:27017,cluster0-shard-00-01-gw1sh.mongodb.net:27017,cluster0-shard-00-02-gw1sh.mongodb.net:27017/JuraDB?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
const db = mongoose.connect(uri, {useNewUrlParser: true}, () => {
    console.log('connected');
    
});

let juraDB = {};

fs.readFile('./Data/jura.json', (err,data) => {
    if(!err){
         juraDB = JSON.parse(data).regiony;
            juraDB.forEach(region => {
                const regionName = region.name;
                region.rejony.forEach(rejon => {
                    console.log(regionName, rejon.name);
                    const rejonName = rejon.name;

                    const newRejon = new Rejon({
                        region: regionName,
                        rejon: rejonName
                    });

                    newRejon.save()
                        .then(result => {
                        console.log(result);
                        })
                        .catch(err => console.log(err));

                    rejon.skaly.forEach(skala => {
                        console.log(rejonName, skala.name);
                        const skalaName = skala.name;

                        const newSkala = new Skala({
                            rejon: rejonName,
                            skala: skalaName
                        });
    
                        newSkala.save()
                            .then(result => {
                            console.log(result);
                            })
                            .catch(err => console.log(err));

                        skala.drogi.forEach(droga => {
                            console.log(droga);

                            const newDroga = new Droga({
                                skala: skalaName,
                                droga: droga.name,
                                wycena: droga.wycena,
                                przejscia: droga.przejscia,
                                ocena: droga.ocena
                            });
        
                            newDroga.save()
                                .then(result => {
                                console.log(result);
                                })
                                .catch(err => console.log(err));
                        })
                    })
                })
            });
    } else {
        console.log('Błąd' +err);
    }
})

