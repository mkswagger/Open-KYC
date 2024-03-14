import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button"

export default function InputFile() {
    const onSubmit = async (values: any) => {
        values.preventDefault()
        console.log('values', values)
        console.log(values)
    }
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">Upload your Signature</Label>
            <Input id="picture" type="file" />
            <Button onClick={onSubmit}>
                Upload
            </Button>
        </div>
    )
}
