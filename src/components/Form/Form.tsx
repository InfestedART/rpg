import { useForm, FormProvider, type FieldValues } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

type FormProps<TSchema extends z.ZodType<FieldValues>> = {
  schema: TSchema
  onSubmit: (data: z.infer<TSchema>) => void
  children: React.ReactNode
}

export default function Form<TSchema extends z.ZodType<FieldValues>>({
  schema,
  onSubmit,
  children,
}: FormProps<TSchema>) {
  const methods = useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema) as any,
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </FormProvider>
  )
}