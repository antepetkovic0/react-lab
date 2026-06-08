import { createFileRoute } from '@tanstack/react-router'
import { OAuthPkcePage } from '@/features/security/oauth-pkce/OAuthPkcePage'

export const Route = createFileRoute('/_dashboard/security/oauth-pkce')({
  component: OAuthPkcePage,
})
