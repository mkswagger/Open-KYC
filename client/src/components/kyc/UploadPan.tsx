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
            const res = await fetch('http://localhost:5000/pan-upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            console.log('data', data)
            localStorage.setItem('pan-number', data.pan_number)
            localStorage.setItem('dob', data.dob)
            setIsUploaded(true)
        } catch (error) {
            console.log('error', error)
        }
    }
    return (
        <form onSubmit={onSubmit} encType="multipart/form-data">
            <Label htmlFor="pan">Upload PAN Card</Label>
            <Input type="file" name="pan" id="pan" onChange={onSubmit} />
            {isUploaded ? <p>File uploaded successfully</p> : <Button type="submit" className="w-full">Submit</Button>}
        </form>
    )
}
