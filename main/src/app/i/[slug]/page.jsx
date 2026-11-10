import { notFound } from "next/navigation";
import {
  getAllInvitations,
  getInvitationBySlug,
} from "../../../content/invitations";
import { resolveTemplateComponent } from "../../../templates";

export function generateStaticParams() {
  return getAllInvitations().map((invitation) => ({
    slug: invitation.meta.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const invitation = getInvitationBySlug(slug);

  if (!invitation) {
    return {
      title: "Invitación no encontrada | Estudio 11:12",
    };
  }

  const title =
    invitation.meta?.title ||
    `${invitation.celebrant?.name || "Invitación"} | Estudio 11:12`;
  const description =
    invitation.meta?.summary ||
    invitation.hero?.subtitle ||
    "Invitación digital interactiva creada por Estudio 11:12.";
  const coverImage = invitation.meta?.coverImage || invitation.hero?.image;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: coverImage ? [{ url: coverImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: coverImage ? [coverImage] : [],
    },
  };
}

export default async function InvitationPage({ params }) {
  const { slug } = await params;
  const invitation = getInvitationBySlug(slug);

  if (!invitation) {
    notFound();
  }

  const TemplateComponent = resolveTemplateComponent(
    invitation.meta?.templateId
  );

  if (!TemplateComponent) {
    notFound();
  }

  return <TemplateComponent data={invitation} />;
}
