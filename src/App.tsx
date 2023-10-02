import { Github, Wand2 } from 'lucide-react'
import { Textarea } from './components/ui/textarea';
import { Button } from "./components/ui/button";
import { Separator } from './components/ui/separator';
import { Label } from './components/ui/label';
import { Slider } from './components/ui/slider';
import { VideoInputForm } from './components/video-input-form';
import { PromptSelect } from './components/prompt-select';
import { useState } from 'react';
import { useCompletion } from 'ai/react'

export function App() {

    const [temperature, setTemperature] = useState(0.5)
    const [videoId, setVideoId] = useState<string | null >(null)


    const {
      input,
      setInput,
      handleInputChange,
      handleSubmit,
      completion,
      isLoading,
    } = useCompletion({
      api: 'http://localhost:3333/ai/complete',
      body: {
        videoId,
        temperature,
      },
      headers: {
        'Content-type': 'application/json',
      }
    })


  return (
  <div className="min-h-screen flex flex-col">
    <div className="px-6 py-3 flex items-center justify-between border-b">
      <h1 className="text-l font-bold">Upload AI</h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Desenvolvido com 💜 by Larissa</span>

          <Separator orientation='vertical' className='h-6' />

        <Button variant={"destructive"}>
         <Github className='w-4 h-4 mr-2' /> Github</Button>

      </div>
    </div>

    <main className="flex-1 p-6 flex gap-6">
      <div className="flex flex-col flex-1 gap-4">
        <div className="grid grid-rows-2 gap-4 flex-1">
          <Textarea 
          className='resize-none p-4 leading-relaxed'
          placeholder='Inclua o prompt para a IA...' 
          value={input}
          onChange={handleInputChange}
          />

          <Textarea 
          className='resize-none p-4 leading-relaxed'
          placeholder='Resultado gerado pela IA...' 
          readOnly
          value={completion}
          />
        </div>

        <p className="text-sm text-muted-foreground">Lembre-se: você pode utilizar a variável <code className="text-red-500">{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado.</p>
      </div>

        <aside className="w-80 space-y-6">
          <VideoInputForm onVideoUploaded={setVideoId} />

          <Separator />
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className='space-y-2'>
              <Label>Prompt</Label>

              <PromptSelect onPromptSelected={setInput} />

            </div>

            <Separator />

            <div className='space-y-4'>
              <Label>Temperatura</Label>
              <Slider 
                min={0}
                max={1}
                step={0.1}
                value={[temperature]}
                onValueChange={value => setTemperature(value[0])}
              />

              <span className='block text-xs text-muted-foreground italic leading-relaxed'>Valores mais altos tendem a deixar o resultado mais criativo e com possíveis erros.</span>
            </div>

            <Separator />
            <Button 
            disabled={isLoading}
            className='w-full'
            type='submit'>
              Executar
              <Wand2 className='w-4 h-4 ml-2' />
            </Button>
          </form>
        </aside>
    </main>
  </div>
  )
}

