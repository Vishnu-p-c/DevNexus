function TaskList({ tasks, deleteTask }) {

    return (
        <div>

            {
                tasks.map((task) => (

                    <div key={task.id}>

                        <h3>{task.title}</h3>

                        <button
                            onClick={() => deleteTask(task.id)}
                        >
                            Delete
                        </button>

                    </div>

                ))
            }

        </div>
    );
}

export default TaskList;