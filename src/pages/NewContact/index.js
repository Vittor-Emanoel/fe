import { useRef } from "react"
import ContactForm from "../../components/ContactForm"
import PageHeader from "../../components/PageHeader"
import ContactsService from "../../services/ContactsService"
import ContactMapper from "../../services/mappers/ContactMapper"
import toast from "../../utils/toast"

export default function NewContact() {
  const contactFormRef = useRef(null)

  async function handleSubmit(formData) {
    try {
      const contact = ContactMapper.toPersistence(formData)

      await ContactsService.createContact(contact)

      contactFormRef.current.resetFields()

      toast({
        type: "success",
        text: " Contato cadastrado com sucesso!",
        duration: 3000
      })
    } catch (error) {
      toast({
        type: "danger",
        text: "Ocorreu um erro ao cadastrar o contato!"
      })
    }
  }

  return (
    <>
      <PageHeader title="Novo Contato" />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  )
}
