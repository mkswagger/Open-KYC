import { Button } from "../ui/button";

export default function ConfirmDetails({ onNextStep }: { onNextStep: () => void }) {
    const handleNextStep = () => {
        onNextStep();
    }
    return (
        <div>
            <Button onClick={handleNextStep}>
                Confirm Details
            </Button>
        </div>
    )
}