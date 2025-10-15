use (tras_JuanArdila);

const otb = db.getMongo().startSession();

const municipios = otb.getDatabase("tras_JuanArdila").municipios;

session.withTransaction(() =>{

// todos los municipios que inician con san
municipios.find({ nombreMun: { $regex: /^san\b/i} });

// todos los municipios que terminan en ito
municipios.find({ nombreMun: { $regex: /ito$/i} });

//todos los municipios que contenga valle
municipios.find({ nombreMun: { $regex: /valle/i} });

//todos los municipios que inicien por vocal
municipios.find({ nombreMun: { $regex: /^aeiouáéíóú/i} });

//todos los municipios que terminen en al o el
municipios.find({ nombreMun: { $regex: /al|el$/i} });

//todos los municipios que contegan dos vocales seguidas
municipios.find({ nombreMun: { $regex: /aa|ae|ai|ao|au|ea|ee|ei|eo|eu|ia|ie|ii|io|iu|oa|oe|oi|oo|ou|ua|ue|ui|uo|uu/i} });

//todos los municipios que contegan una z
municipios.find({ nombreMun: { $regex: /z/i} });

//todos los municipios que inicien por santa y terminen por cualquier oracion o letra
municipios.find({ nombreMun: { $regex: /^santa/i} });

//todos los municipios que contengan solo 6 letras
municipios.find({ nombreMun: { $regex: /a-z(6)$/i} });

//todos los municipios que contengan solo 2 palabras
municipios.find({ nombreMun: { $regex: /^\S+ \S+$/i} })

//todos los municipios que terminen en ito o ita
municipios.find({ nombreMun: { $regex: /ito|ita $/i} });

//todos los municipios que contegan una gua
municipios.find({ nombreMun: { $regex: /gua/i} });

//todos los municipios que contenga 10 caracteres
municipios.find({ nombreMun: { $regex: /a-z(10)$/i} });

});

//todos los municipios que inicien por la
adb.incautaciones.aggregate([
    {
        $lookup: {
            from: "municipios",                
            localField: "codmun",            
            foreignField: "codmun",          
            as: "total"                        
        }
    },
    {
        $unwind: "$total"                       
    },
    {
        $match: {
            "total.nombreMun": {$regex: /^la\b/i}   
        }
    },
    {
        $group: {
            _id: null,                          
            total: {$sum: "$cantidad"}          
        }
    },
    {
        $project: {_id: 0}                       
    }
]);

//todos los municipios que terminen por co
adb.incautaciones.aggregate([
    {
        $lookup: {
            from: "municipios",                
            localField: "coddmun",            
            foreignField: "coddmun",          
            as: "total"                        
        }
    },
    {
        $unwind: "$total"                       
    },
    {
        $match: {
            "total.nombreMuni": {$regex: /co$/i}   
        }
    },
    {
        $group: {
            _id: null,                          
            total: {$sum: "$cantidad"}          
        }
    },
    {
        $project: {_id: 0}                       
    }
]);