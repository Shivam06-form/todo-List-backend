import { Router, Request, Response, NextFunction } from 'express'
import todoModal from '../modal/todoModal'
import { ErrorHandler } from '../middleware/ErrorHandler'


const router = Router()
type postData = {
    title: string, release_date: string, image: string
}

////get All Todos //////
router.get('/', async (req: Request, res: Response, next: NextFunction) => {

    let AllTodos: any[]
    try {
        AllTodos = await todoModal.find({})

    } catch (error) {
        return next(ErrorHandler('Cannot Get the TODOS', "Error", 404))
    }

    res.status(200).json({
        Name: "SUCCESS",
        Todos: AllTodos
    })
})




//// Post a new Todo //////
router.post('/post', async (req: Request, res: Response, next: NextFunction) => {
    console.log((req.body), 'name')
    const { title, release_date, image }: postData = req.body

    const getTodo = await todoModal.findOne({ title: title })

    if (getTodo) {
        res.status(404).json({ NAME: "Title Already Exists" })
        return next(ErrorHandler("Title Already Exists", "Error", 404))
    }

    if (title === '' || release_date === '' || image === '') {
        res.status(404).json({ NAME: "Something is not Enter Properly" })
        return next(ErrorHandler("Something is not Enter Properly", "Error", 404))
    }
    try {
        const NEWTODO = new todoModal({
            title: title,
            release_date: release_date,
            image: image
        })

        await NEWTODO.save()
        res.status(200).json({ NAME: "SUCCESS", NEWTODO })
    } catch (error: any) {
        return next(ErrorHandler(error.message, "Error", 404))
    }

})



/// Delete a Todo //////      
router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {

    const getTodo = await todoModal.findById(req.params.id)
    if (!getTodo) {
        return res.status(409).json({
            Message: "Fail to Delete",
        });
    }

    try {
        await todoModal.deleteOne({ _id: req.params.id })
    } catch (error) {
        res.status(409).json({
            Message: "Fail to Delete",
        });
        return next(
            ErrorHandler("Fail to Delete , Please try Again", "error", 409)
        );
    }

    res.status(202).json({
        Message: "Delete Success",
    });
}
)


/// Edit a Todo //////          
router.patch('/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        let EditTodo;

        try {
            EditTodo = await todoModal.findByIdAndUpdate(req.params.id, {
                title: req.body.title,
                release_date: req.body.release_date,
                image: req.body.image,
            });
        } catch (error) {
            return next(ErrorHandler("Fail To Update", "error", 202));
        }
        res.status(202).json({
            Message: "Update Success",
        });
    }
)


export default router