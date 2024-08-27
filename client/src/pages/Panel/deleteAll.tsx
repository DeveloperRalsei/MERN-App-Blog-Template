import { Alert, Button, Divider, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import blogRoutes from "../../routes/blogRoutes";
import { nprogress } from "@mantine/nprogress";
import { useState } from "react";

export const Page = () => {
    const [message, setMessage] = useState<{message?: string, isComplate: boolean}>({isComplate: false})
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            value: ""
        },
        validate: {
            value: (v) => v === 'Confirm' ? null : "Invalid Value"
        }
    })

    const handleSubmit = async () => {
        nprogress.start()
        try {
            const response = await blogRoutes.deleteAll()
            nprogress.complete()
            setMessage({
                message: "All Blogs deleted",
                isComplate: true
            })
        } catch (error) {
            console.error(error)
            nprogress.cleanup()
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Title order={3}>Delete All Blogs</Title>
            <Divider mb={10}/>
            <Alert my={10} color={message.isComplate ? "green" : "gray"}>
                {message.message ? message.message : `Please write "Confirm" to confirm`}
            </Alert>
            <TextInput
                placeholder="Confirm"
                {...form.getInputProps("value")}
            /> <br />
            <Button type="submit">
                Confirm
            </Button>
        </form>
    );
};