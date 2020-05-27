### Stack-Hack-1.0 ToDo App
Link : https://stackhack-todo.herokuapp.com/api


## Routes
---

```
    /api/signup - POST
        Required Params: 
        -name
        -email
        -password

    /api/login - POST
        Required Params
        -email
        -password

        **x-auth-token returned here. Used to verfify the user. 
        **Keep in localstorge if possible the token is valid for 30 days.

    /api/verify/:token - GET
        -The link will be sent to the users mail. ( To be discussed later...)
    
    /api/logout - GET
        -Will invalidate the x-auth-token


    ||-------------x-auth-token - Required After This----------------||

    /api/todo - GET
        -Gets all todos of the user loggedin

    /api/todo - POST
        Required Params
        -task_title,
        -priority -> 0=low | 1=medium | 2=high,
        -label,
        -due_date -> "mm-dd-yyyy",
        -status (Not Required - default 0) -> 0=incomplete | 1=done | 2=partially done

    /api/todo/:id - PATCH 
        Required Params
        -task_title,
        -priority -> 0=low | 1=medium | 2=high,
        -label,
        -due_date -> "mm-dd-yyyy",
        -status (Not Required - default 0) -> 0=incomplete | 1=done | 2=partially done
    
    /api/todo/:id - DELETE
        - will delete the id passed

    

```