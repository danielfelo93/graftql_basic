import { IResolvers } from '@graphql-tools/utils';
import { Db, ObjectId } from 'mongodb';

const skillResolver: IResolvers = {
    Query: {
        getSkills: async (parent, args, context: Db) => {
            try {
                return await context.collection('skills').find().toArray() ?? [];
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
                    return "Skill already registered"; 
                }
        
                await context.collection('skills').insertOne(args.skill);
                return "Skill entry created successfully";
            } catch (error) {
                console.log(error);
                
                return "Error creating skill";  
            }
        },
        updateSkill: async (parent, args, context: Db) => {
            try {
                const { _id, skill } = args;
                
                // Asegurarse de que el _id es válido
                if (!ObjectId.isValid(_id)) throw new Error("Invalid Skill ID");
    
                const skillColl = await context.collection('skills').findOne({ _id: new ObjectId(_id) });
                if (!skillColl) throw new Error("Skill not found");
    
                await context.collection('skills').updateOne(
                    { _id: new ObjectId(_id) },
                    { $set: skill }
                );
    
                return "Skill updated successfully";
            } catch (error) {
                console.log(error);
                throw new Error("Error updating skill");
            }
        },
        deleteSkill: async (parent, args, context: Db) => {
            try {
                const { _id } = args;
    
                // Asegurarse de que el _id es válido
                if (!ObjectId.isValid(_id)) throw new Error("Invalid Skill ID");
    
                const result = await context.collection('skills').deleteOne({ _id: new ObjectId(_id) });
                
                if (result.deletedCount === 0) throw new Error("Skill not found");
    
                return "Skill deleted successfully";
            } catch (error) {
                console.log(error);
                throw new Error("Error deleting skill");
            }
        }
    }
}

export default skillResolver;