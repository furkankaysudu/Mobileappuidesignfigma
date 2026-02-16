import React, { useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { MobileFrame } from '../ui/shell';
import { Button } from '../ui/primitives';
import { Link } from 'react-router';

// Define node types with colors
const nodeDefaults = {
  style: {
    borderRadius: '8px',
    padding: '12px 16px',
    border: '2px solid',
    fontSize: '13px',
    fontWeight: '500',
  },
};

const initialNodes: Node[] = [
  // Entry Point
  {
    id: '1',
    type: 'input',
    data: { label: '📱 App Launch' },
    position: { x: 250, y: 0 },
    style: { ...nodeDefaults.style, borderColor: '#10b981', background: '#d1fae5', color: '#065f46' },
  },

  // Main Dashboard
  {
    id: '2',
    data: { label: '🏠 Dashboard\n(Active Loads, Quick Actions)' },
    position: { x: 220, y: 100 },
    style: { ...nodeDefaults.style, borderColor: '#3b82f6', background: '#dbeafe', color: '#1e40af' },
  },

  // Create Load Path
  {
    id: '3',
    data: { label: '➕ Post a Load\n(Button Click)' },
    position: { x: 50, y: 220 },
    style: { ...nodeDefaults.style, borderColor: '#8b5cf6', background: '#ede9fe', color: '#5b21b6' },
  },

  {
    id: '4',
    data: { label: '🔀 Choose Mode\n(Quick / Advanced)' },
    position: { x: 50, y: 320 },
    style: { ...nodeDefaults.style, borderColor: '#8b5cf6', background: '#ede9fe', color: '#5b21b6' },
  },

  // Quick Mode Path
  {
    id: '5',
    data: { label: '⚡ Quick Mode\n4 Steps' },
    position: { x: -80, y: 420 },
    style: { ...nodeDefaults.style, borderColor: '#f59e0b', background: '#fef3c7', color: '#92400e' },
  },

  {
    id: '6',
    data: { label: 'Step 1: Pickup\nLocation & Time' },
    position: { x: -80, y: 520 },
    style: { ...nodeDefaults.style, borderColor: '#f59e0b', background: '#fef3c7', color: '#92400e', fontSize: '11px' },
  },

  {
    id: '7',
    data: { label: 'Step 2: Drop-off\nLocation & Time' },
    position: { x: -80, y: 620 },
    style: { ...nodeDefaults.style, borderColor: '#f59e0b', background: '#fef3c7', color: '#92400e', fontSize: '11px' },
  },

  {
    id: '8',
    data: { label: 'Step 3: Load Details\nType, Weight, Quantity' },
    position: { x: -80, y: 720 },
    style: { ...nodeDefaults.style, borderColor: '#f59e0b', background: '#fef3c7', color: '#92400e', fontSize: '11px' },
  },

  {
    id: '9',
    data: { label: 'Step 4: Review\n& Submit' },
    position: { x: -80, y: 820 },
    style: { ...nodeDefaults.style, borderColor: '#f59e0b', background: '#fef3c7', color: '#92400e', fontSize: '11px' },
  },

  // Advanced Mode Path
  {
    id: '10',
    data: { label: '🔧 Advanced Mode\n7 Steps' },
    position: { x: 180, y: 420 },
    style: { ...nodeDefaults.style, borderColor: '#ec4899', background: '#fce7f3', color: '#9f1239' },
  },

  {
    id: '11',
    data: { label: 'Steps 1-3:\nSame as Quick' },
    position: { x: 180, y: 520 },
    style: { ...nodeDefaults.style, borderColor: '#ec4899', background: '#fce7f3', color: '#9f1239', fontSize: '11px' },
  },

  {
    id: '12',
    data: { label: 'Step 4: Vehicle\nType & Requirements' },
    position: { x: 180, y: 620 },
    style: { ...nodeDefaults.style, borderColor: '#ec4899', background: '#fce7f3', color: '#9f1239', fontSize: '11px' },
  },

  {
    id: '13',
    data: { label: 'Step 5: Handling\nLoading Method & Notes' },
    position: { x: 180, y: 720 },
    style: { ...nodeDefaults.style, borderColor: '#ec4899', background: '#fce7f3', color: '#9f1239', fontSize: '11px' },
  },

  {
    id: '14',
    data: { label: 'Step 6: Pricing\nFixed / Get Quotes' },
    position: { x: 180, y: 820 },
    style: { ...nodeDefaults.style, borderColor: '#ec4899', background: '#fce7f3', color: '#9f1239', fontSize: '11px' },
  },

  {
    id: '15',
    data: { label: 'Step 7: Review\n& Submit' },
    position: { x: 180, y: 920 },
    style: { ...nodeDefaults.style, borderColor: '#ec4899', background: '#fce7f3', color: '#9f1239', fontSize: '11px' },
  },

  // Post-Submit
  {
    id: '16',
    data: { label: '✅ Load Posted' },
    position: { x: 50, y: 1020 },
    style: { ...nodeDefaults.style, borderColor: '#10b981', background: '#d1fae5', color: '#065f46' },
  },

  // Offers Flow
  {
    id: '17',
    data: { label: '📋 Driver Offers\nView & Compare Bids' },
    position: { x: 400, y: 220 },
    style: { ...nodeDefaults.style, borderColor: '#06b6d4', background: '#cffafe', color: '#164e63' },
  },

  {
    id: '18',
    data: { label: '👤 View Driver Profile\nRating, History, Distance' },
    position: { x: 400, y: 340 },
    style: { ...nodeDefaults.style, borderColor: '#06b6d4', background: '#cffafe', color: '#164e63', fontSize: '11px' },
  },

  {
    id: '19',
    data: { label: '✓ Accept Offer\nor\n✕ Reject Offer' },
    position: { x: 400, y: 460 },
    style: { ...nodeDefaults.style, borderColor: '#06b6d4', background: '#cffafe', color: '#164e63', fontSize: '11px' },
  },

  {
    id: '20',
    data: { label: '🤝 Driver Assigned' },
    position: { x: 400, y: 580 },
    style: { ...nodeDefaults.style, borderColor: '#10b981', background: '#d1fae5', color: '#065f46' },
  },

  // Tracking Flow
  {
    id: '21',
    data: { label: '📍 Tracking\nReal-time Location' },
    position: { x: 220, y: 1140 },
    style: { ...nodeDefaults.style, borderColor: '#14b8a6', background: '#ccfbf1', color: '#134e4a' },
  },

  {
    id: '22',
    data: { label: '🗺️ View Map\nDriver Position & Route' },
    position: { x: 220, y: 1260 },
    style: { ...nodeDefaults.style, borderColor: '#14b8a6', background: '#ccfbf1', color: '#134e4a', fontSize: '11px' },
  },

  {
    id: '23',
    data: { label: '📊 Shipment Timeline\nPickup → In Transit → Delivered' },
    position: { x: 220, y: 1380 },
    style: { ...nodeDefaults.style, borderColor: '#14b8a6', background: '#ccfbf1', color: '#134e4a', fontSize: '11px' },
  },

  {
    id: '24',
    data: { label: '📦 Delivery Complete' },
    position: { x: 220, y: 1500 },
    style: { ...nodeDefaults.style, borderColor: '#10b981', background: '#d1fae5', color: '#065f46' },
  },

  // Chat Flow
  {
    id: '25',
    data: { label: '💬 Chat\nCommunicate with Driver' },
    position: { x: 580, y: 580 },
    style: { ...nodeDefaults.style, borderColor: '#6366f1', background: '#e0e7ff', color: '#3730a3' },
  },

  {
    id: '26',
    data: { label: '📨 Send Message\nText & Attachments' },
    position: { x: 580, y: 700 },
    style: { ...nodeDefaults.style, borderColor: '#6366f1', background: '#e0e7ff', color: '#3730a3', fontSize: '11px' },
  },

  {
    id: '27',
    data: { label: '🔔 Real-time Updates\nDelivery Notifications' },
    position: { x: 580, y: 820 },
    style: { ...nodeDefaults.style, borderColor: '#6366f1', background: '#e0e7ff', color: '#3730a3', fontSize: '11px' },
  },

  // Account Flow
  {
    id: '28',
    data: { label: '⚙️ Account\nSettings & Profile' },
    position: { x: 580, y: 100 },
    style: { ...nodeDefaults.style, borderColor: '#64748b', background: '#f1f5f9', color: '#334155' },
  },

  // Return to Dashboard
  {
    id: '29',
    data: { label: '🔄 Return to Dashboard\n(Navigation)' },
    position: { x: 450, y: 1500 },
    style: { ...nodeDefaults.style, borderColor: '#3b82f6', background: '#dbeafe', color: '#1e40af', fontSize: '11px' },
  },
];

const initialEdges: Edge[] = [
  // Entry to Dashboard
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },

  // Dashboard to Create Load
  { id: 'e2-3', source: '2', target: '3', label: 'Post Load', style: { stroke: '#8b5cf6', strokeWidth: 2 } },

  // Create Load to Mode Selection
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#8b5cf6', strokeWidth: 2 } },

  // Quick Mode Path
  { id: 'e4-5', source: '4', target: '5', label: 'Quick', style: { stroke: '#f59e0b', strokeWidth: 2 } },
  { id: 'e5-6', source: '5', target: '6', animated: true, style: { stroke: '#f59e0b', strokeWidth: 2 } },
  { id: 'e6-7', source: '6', target: '7', animated: true, style: { stroke: '#f59e0b', strokeWidth: 2 } },
  { id: 'e7-8', source: '7', target: '8', animated: true, style: { stroke: '#f59e0b', strokeWidth: 2 } },
  { id: 'e8-9', source: '8', target: '9', animated: true, style: { stroke: '#f59e0b', strokeWidth: 2 } },
  { id: 'e9-16', source: '9', target: '16', label: 'Submit', style: { stroke: '#10b981', strokeWidth: 2 } },

  // Advanced Mode Path
  { id: 'e4-10', source: '4', target: '10', label: 'Advanced', style: { stroke: '#ec4899', strokeWidth: 2 } },
  { id: 'e10-11', source: '10', target: '11', animated: true, style: { stroke: '#ec4899', strokeWidth: 2 } },
  { id: 'e11-12', source: '11', target: '12', animated: true, style: { stroke: '#ec4899', strokeWidth: 2 } },
  { id: 'e12-13', source: '12', target: '13', animated: true, style: { stroke: '#ec4899', strokeWidth: 2 } },
  { id: 'e13-14', source: '13', target: '14', animated: true, style: { stroke: '#ec4899', strokeWidth: 2 } },
  { id: 'e14-15', source: '14', target: '15', animated: true, style: { stroke: '#ec4899', strokeWidth: 2 } },
  { id: 'e15-16', source: '15', target: '16', label: 'Submit', style: { stroke: '#10b981', strokeWidth: 2 } },

  // Dashboard to Offers
  { id: 'e2-17', source: '2', target: '17', label: 'View Offers', style: { stroke: '#06b6d4', strokeWidth: 2 } },

  // Offers Flow
  { id: 'e17-18', source: '17', target: '18', animated: true, style: { stroke: '#06b6d4', strokeWidth: 2 } },
  { id: 'e18-19', source: '18', target: '19', animated: true, style: { stroke: '#06b6d4', strokeWidth: 2 } },
  { id: 'e19-20', source: '19', target: '20', label: 'Accept', style: { stroke: '#10b981', strokeWidth: 2 } },

  // Post-Submit to Tracking
  { id: 'e16-21', source: '16', target: '21', label: 'Track', style: { stroke: '#14b8a6', strokeWidth: 2 } },

  // Tracking Flow
  { id: 'e21-22', source: '21', target: '22', animated: true, style: { stroke: '#14b8a6', strokeWidth: 2 } },
  { id: 'e22-23', source: '22', target: '23', animated: true, style: { stroke: '#14b8a6', strokeWidth: 2 } },
  { id: 'e23-24', source: '23', target: '24', animated: true, style: { stroke: '#14b8a6', strokeWidth: 2 } },

  // Assigned to Chat
  { id: 'e20-25', source: '20', target: '25', label: 'Chat', style: { stroke: '#6366f1', strokeWidth: 2 } },

  // Chat Flow
  { id: 'e25-26', source: '25', target: '26', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
  { id: 'e26-27', source: '26', target: '27', animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },

  // Dashboard to Account
  { id: 'e2-28', source: '2', target: '28', label: 'Settings', style: { stroke: '#64748b', strokeWidth: 2 } },

  // Return to Dashboard
  { id: 'e24-29', source: '24', target: '29', style: { stroke: '#3b82f6', strokeWidth: 2 } },
  { id: 'e29-2', source: '29', target: '2', animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
];

export function UXFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <MobileFrame
      title="UX Flow"
      left={
        <Link to="/">
          <Button size="sm" variant="ghost">
            ← Back
          </Button>
        </Link>
      }
    >
      <div className="h-[calc(100vh-52px)]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          connectionLineType={ConnectionLineType.SmoothStep}
          fitView
          attributionPosition="bottom-left"
        >
          <Background />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              if (node.type === 'input') return '#10b981';
              return '#3b82f6';
            }}
            maskColor="rgba(0, 0, 0, 0.1)"
          />
        </ReactFlow>
      </div>
    </MobileFrame>
  );
}
