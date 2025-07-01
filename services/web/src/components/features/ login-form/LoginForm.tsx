'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from "@/components/ui/link"
import { Label } from "@/components/ui/label"
import { authenticate } from "@/actions/auth/authenticate"

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Logging in...' : 'Log in'}
    </Button>
  )
}

export default function LoginForm() {
  const [state, formAction] = useFormState(authenticate, undefined)

  return (
    <div>
      <div>
        <div>🗄️</div>
        <h1>Terrarriaform</h1>
      </div>
      
      <h2>Welcome!</h2>
      <p>Log in to Terrarriaform to continue to Terrarriaform.</p>
      
      <form action={formAction}>
        {state?.error && (
          <div style={{ color: 'red', marginBottom: '1rem' }}>
            {state.error}
          </div>
        )}
        
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email" 
            name="email"
            type="email" 
            placeholder="Your email address"
            required
          />
        </div>
        
        <div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Link href="#">Forgot password?</Link>
          </div>
          <div>
            <Input 
              id="password"
              name="password" 
              type="password" 
              placeholder="Your password"
              required
            />
            <button type="button">👁️</button>
          </div>
        </div>
        
        <SubmitButton />
        
      </form>

    </div>
  )
}
