import supabase from "../db.js";


//add task
const addTask = async (req, res) =>{
    try {
        const {user_id ,title ,description } = req.body;

        const {data ,error} = await supabase
        .from("tasks")
        .insert([
            {
                user_id,
                title,
                description
            }
        ])
        .select();

        if (error){
            return res.status(400).json({
                success: false,
                message : error.message
            });
        }

        res.status(200).json({
            success: true,
            data
        });
    
    }catch(error){
        res.status(500).json({
            success : false,
            message :error.message
        });
    }
}


//gettasks
const getTask = async (req,res)=>{
    try{
       // const {user_id} = req.params;

        const {data, error} = await supabase
        .from("tasks")
        .select("*");
       // .eq("user_id",user_id);

        if(error){
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        res.status(200).json({
            success:true,
            data
        })


    }catch(error){
        res.status(400).json({
            success:false,
            message: error.message
        });
    }
}


//Delete Task

const deleteTask = async (req,res)=>{
    try{
        const {id } = req.params;

        const {error } = await supabase
        .from("tasks")
        .delete()
        .eq("id",id);

        if(error){
            return res.status(400).json({
                success:false,
                message: error.message
            });
        }

        res.status(200).json({
            success:true,
            message: 'Task deleted successfully'
        })


    }catch(error){
        res.status(400).json({
            success : false,
            message: error.message
        });
    }
}

export { addTask, getTask, deleteTask };