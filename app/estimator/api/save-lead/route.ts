import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/supabase/client';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    if (!payload || typeof payload !== 'object') {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
    }

    const {
      formData,
      estimate,
    } = payload;

    if (!formData || !estimate) {
      return NextResponse.json(
        { error: 'Missing form data or estimate details.' },
        { status: 400 }
      );
    }

    const client = getSupabaseClient();
    const upsertPayload = {
      service: formData.service,
      project_location: formData.projectLocation,
      built_up_area: formData.builtUpArea || null,
      project_type: formData.projectType,
      timeline_preference: formData.timelinePreference,
      material_quality: formData.materialQuality,
      interior_requirement: formData.interiorRequirement,
      finish_quality: formData.finishQuality,
      structural_complexity: formData.structuralComplexity,
      addons: formData.addons ?? [],
      client_name: formData.clientName,
      client_email: formData.clientEmail,
      client_phone: formData.clientPhone,
      additional_notes: formData.additionalNotes,
      min_estimate: estimate.minEstimate,
      max_estimate: estimate.maxEstimate,
      margin_percentage: estimate.marginPercentage,
      timeline_weeks: estimate.timelineWeeks,
      timeline_label: estimate.timelineLabel,
      breakdown: estimate.breakdown,
    };

    const { error } = await client.from('project_leads').insert([upsertPayload]);

    if (error) {
      console.error('[save-lead] Supabase error', error);
      return NextResponse.json(
        { error: 'Unable to save lead information. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[save-lead]', error);
    return NextResponse.json(
      { error: 'Unexpected error while saving lead.' },
      { status: 500 }
    );
  }
}


