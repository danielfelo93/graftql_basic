import { IResolvers } from '@graphql-tools/utils';
import { Db, ObjectId } from 'mongodb';

const skillResolver: IResolvers = {
    Query: {
        getSkills: async (parent, args, context: Db) => {
            try {
                return await context.collection('Skills').find().toArray() ?? [];
            } catch (error) {
                console.log(error);
            }
        }       
    },
    Mutation: {
        createSkill: async (parent, args, context: Db) => {
            try {
                const reg_ex = new RegExp(args?.skill?.name, 'i');
                const skillColl = await context.collection('skills').findOne({ name: reg_ex });
        
                if (skillColl) {
                    return "Skill already registered";  // Cambiar el lanzamiento de la excepción por un mensaje
                }
        
                await context.collection('skills').insertOne(args.skill);
                return "Skill entry created successfully";
            } catch (error) {
                console.log(error);
                // En caso de error, retornar un mensaje que indique que hubo un problema
                return "Error creating skill";  
            }
        },
        updateSkill: async (parent, args, context: Db) => {
            try {
                console.log(args);
                const skillColl= await context.collection('Skills').findOne({ _id: new ObjectId(args._id) });

                if(!skillColl) throw new Error("Skills not found");
                console.log("validando skillColl");

                await context.collection('Skills').updateOne(
                    { _id: new ObjectId(args._id) },
                    { $set: args.skill }
                  );

                return "Skill updated successfully";
            } catch (error) {
                console.log(error);
            }
        },
    }
}

export default skillResolver;