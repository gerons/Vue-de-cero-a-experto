import { defineComponent, watch, watchEffect } from "vue"
import { useMutation, useQuery } from "@tanstack/vue-query"
import { useFieldArray, useForm } from 'vee-validate'
import * as yup from 'yup'
import { createUpadateProductAction, getProductById } from "@/modulos/products/actions"
import { useRouter } from "vue-router"
import CustomInput from "@/modulos/common/components/CustomInput.vue"
import CustomTextarea from "@/modulos/common/components/CustomTextarea.vue"
import { useToast } from "vue-toastification"

const validationSchema = yup.object({
    title: yup.string().required().min(3),
    slug: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    stock: yup.number().min(1).required(),
    gender: yup.string().required().oneOf(['men', 'women', 'kid'])
});

export default defineComponent({
    components: { CustomInput, CustomTextarea },
    props: {
        productId: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const router = useRouter()
        const toast = useToast()

        const { values, defineField, errors, handleSubmit, resetForm, meta } = useForm({
            validationSchema
        });
        //
        const [title, titleAttrs] = defineField('title')
        const [slug, slugAttrs] = defineField('slug')
        const [description, descriptionAttrs] = defineField('description')
        const [price, priceAttrs] = defineField('price')
        const [stock, stockAttrs] = defineField('stock')
        const [gender, genderAttrs] = defineField('gender')

        const { fields: images } = useFieldArray<string>('images')
        const { fields: sizes, remove: removeSize, push: pushSize } = useFieldArray<string>('sizes')

        const {
          data: product,
          isError,
          isLoading,
          refetch
        } = useQuery({
          queryKey: ['product', props.productId],
          queryFn: () => getProductById(props.productId),
          retry: false
        })

        const {
          mutate,
          isPending,
          isSuccess: isUpdateSuccess,
          data: updatedProduct
        } = useMutation({
          mutationFn: createUpadateProductAction
        })

        // si no se encuentra el producto regresa a la pagina de productos
        watchEffect(() => {
            if (isError.value && !isLoading.value) {
                router.replace('/admin/products')
                return
            }
        })

        watch( product, () => {
            if (!product) return

            resetForm({
                values: product.value
            })
        }, {
            deep: true,
            immediate: true
        })

        watch( isUpdateSuccess, (val) => {
            if (!val) return

            toast.success('Producto actualizado correctamente')
            router.replace(`/admin/products/${ updatedProduct.value!.id }`)

            resetForm({
                values: updatedProduct.value
            })
        })

        watch(() => props.productId, () => {
            refetch()
        })

        // ===============================
        // METODOS
        // ===============================
        const toggleSize = (size: string) => {
            const currentSizes = sizes.value.map( s => s.value)
            const hasSize = currentSizes.includes(size)

            if (hasSize) {
                removeSize(currentSizes.indexOf(size))
            } else {
                pushSize( size )
            }
        }

        const onSubmit = handleSubmit(async(values) => {
            // const product = await createUpdateProductAction(values)

            mutate(values)
        })

        // ===============================
        // 
        // ===============================
        return {
            // propiedades
            values, errors, meta,
            title, titleAttrs, slug, slugAttrs, description, descriptionAttrs,
            price, priceAttrs, stock, stockAttrs, gender, genderAttrs,

            images, sizes,
            isPending,
            // Getters
            allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
            // Actions
            toggleSize, onSubmit,
            hasSize: (size: string) => {
                const currentSizes = sizes.value.map(s => s.value)
            }
        }
    }
})