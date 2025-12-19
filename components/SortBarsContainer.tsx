"use client"

import { useEffect, useState } from "react"
import SortBars from "./SortBars"
import { useNormalSort } from "@/lib/hooks"
import { Accordion, AccordionItem, Button, Input, Slider, Spinner } from "@heroui/react"

type SortBarsContainerProps = {
    endpoint: string,
    defaultArray: number[],
    defaultSteps: number[][]
}

export function SortBarsContainer({ endpoint, defaultArray, defaultSteps }: SortBarsContainerProps) {

    /**
     * hooksを定義
     */
    // ソートAPIへのfetch用hook
    const { mutate, data, isPending } = useNormalSort()

    // ソートする配列とソート過程
    const [initialArray, setInitialArray] = useState(defaultArray)
    const [steps, setSteps] = useState(defaultSteps)

    // ステップバーの値
    const stepsLength = steps.length
    const [stepIndex, setStepIndex] = useState(0)

    // ランダム値生成用の値
    const [length, setLength] = useState(10)
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(50)

    // バリデーションエラー
    const [lengthError, setLengthError] = useState<string>("")
    const [minError, setMinError] = useState<string>("")
    const [maxError, setMaxError] = useState<string>("")

    // fetchを実行
    useEffect(() => {
        mutate({
            endpoint: endpoint,
            initialArray: initialArray
        })
    },[endpoint, mutate, initialArray])

    // stepsを設定
    useEffect(() => {
        if(!data){
            return
        }

        setSteps(data.steps)
        setStepIndex(0)
    },[data])

    /**
     * 関数を定義
     */
    const validateLength = (value: number): boolean => {
        if (isNaN(value) || value < 0 || value > 200) {
            setLengthError("長さは0~200の範囲で入力してください")
            return false
        }
        setLengthError("")
        return true
    }

    const validateMin = (value: number): boolean => {
        if (isNaN(value) || value < 0 || value > 100) {
            setMinError("最小値は0~100の範囲で入力してください")
            return false
        }
        setMinError("")
        return true
    }

    const validateMax = (value: number): boolean => {
        if (isNaN(value) || value < 0 || value > 100) {
            setMaxError("最大値は0~100の範囲で入力してください")
            return false
        }
        setMaxError("")
        return true
    }

    const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        if (inputValue === "") {
            setLength(0)
            setLengthError("")
            return
        }
        const value = Number(inputValue)
        setLength(value)
        validateLength(value)
    }

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        if (inputValue === "") {
            setMin(0)
            setMinError("")
            return
        }
        const value = Number(inputValue)
        setMin(value)
        validateMin(value)
    }

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value
        if (inputValue === "") {
            setMax(0)
            setMaxError("")
            return
        }
        const value = Number(inputValue)
        setMax(value)
        validateMax(value)
    }

    const randomArray = () => {
        return Array.from({ length: length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
    }

    const handleRandom = () => {
        const array = randomArray()
        setInitialArray(array)
    }

    const isValid = lengthError === "" && minError === "" && maxError === ""

    return(
        <div className="w-full">
            {isPending ? (
            <div className="w-full h-72 flex items-center justify-center">
                <Spinner/>
            </div>
            ) : (
            <div className="w-full h-72">
                {/* 棒グラフ */}
                <SortBars data={steps[stepIndex]} states={["normal"]}/>
                {/* ステップバー */}
                <Slider
                className="w-full py-4"
                maxValue={stepsLength - 1}
                value={stepIndex}
                label="ステップ"
                onChange={(value) => setStepIndex(Array.isArray(value) ? Number(value[0]) : Number(value))}
                />
            </div>
            )}

            {/* 値の生成 */}
            <Accordion className="w-full py-2 md:py-4">
                <AccordionItem title="値を変更する" className="hover:bg-neutral-50 px-4 py-2 rounded-lg border-2 border-neutral-100">
                    <form>
                        <div className="flex flex-col gap-2">
                            <div className="w-full grid grid-cols-3">
                                <div className="p-2 flex flex-col gap-1">
                                    <Input
                                    label="長さ"
                                    id="length"
                                    type="number"
                                    value={String(length)}
                                    min={0}
                                    max={200}
                                    onChange={handleLengthChange}
                                    />
                                    {lengthError && (
                                        <span className="text-xs text-red-500">{lengthError}</span>
                                    )}
                                </div>
                                <div className="p-2 flex flex-col gap-1">
                                    <Input
                                    label="最小値"
                                    id="min"
                                    type="number"
                                    value={String(min)}
                                    min={0}
                                    max={100}
                                    onChange={handleMinChange}
                                    />
                                    {minError && (
                                        <span className="text-xs text-red-500">{minError}</span>
                                    )}
                                </div>
                                <div className="p-2 flex flex-col gap-1">
                                    <Input
                                    label="最大値"
                                    id="max"
                                    type="number"
                                    value={String(max)}
                                    min={0}
                                    max={100}
                                    onChange={handleMaxChange}
                                    />
                                    {maxError && (
                                        <span className="text-xs text-red-500">{maxError}</span>
                                    )}
                                </div>
                            </div>
                            <Button className="w-full" variant="shadow" color="primary" onPress={handleRandom} isDisabled={isPending || !isValid}>
                                ランダムな値に変更
                            </Button>
                        </div>
                    </form>
                </AccordionItem>
            </Accordion>
        </div>
    )
}