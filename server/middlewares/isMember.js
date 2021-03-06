const { Community } = require('./../models/community');

let isMember = (req,res,next) => {

    Community.findOne({'_id': req.params.id}, (err, community) => {
        if(!community) return res.json({isMember: false, message: 'Community could not be find'})

        Community.findOne({'_id': req.params.id,'members': req.user._id}, (err, user) => {
            if(err) return res.json({err})

            if(user){
                req.community = community
                next()
                
            }

            if(!user){
                
                if(JSON.stringify(req.user._id) === JSON.stringify(community.founder)){
                    
                    req.community = community
                    next()
                } 
                else return res.json({isMember: false, message: 'You should be member, in order to add post'})  
            } 
    })

})}


module.exports = { isMember }