import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button"
import { useState } from "react";

export default function InputFile() {
    const [isUploaded, setIsUploaded] = useState(false);
    const onSubmit = async (values: any) => {
        values.preventDefault()
        try {
            const formData = new FormData();
            formData.append('file', values.target.files[0]);
            const res = await fetch('http://localhost:5000/passport-photo-upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            console.log('data', data)
            setIsUploaded(true)
        } catch (error) {
            console.log('error', error)
        }
    }
    return (
        <form onSubmit={onSubmit} encType="multipart/form-data">
            <Label htmlFor="photo">Upload Passport Size Photo</Label>
            <Input type="file" name="photo" id="photo" onChange={onSubmit} />
            {isUploaded ? <p>File uploaded successfully</p> : <Button type="submit" className="w-full">Submit</Button>}
        </form>
    )
}
