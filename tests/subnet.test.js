import { describe, it, expect } from 'vitest';
import { calculateSubnet } from '../src/utils/subnetLogic';

describe('Subnet Calculator Logic', () => {
    it('should calculate correct network details for 192.168.1.10/24', () => {
        const result = calculateSubnet('192.168.1.10/24');
        
        expect(result).not.toBeNull();
        expect(result.ip).toBe('192.168.1.10');
        expect(result.mask).toBe('255.255.255.0');
        expect(result.network).toBe('192.168.1.0');
        expect(result.broadcast).toBe('192.168.1.255');
        expect(result.firstHost).toBe('192.168.1.1');
        expect(result.lastHost).toBe('192.168.1.254');
        expect(result.hosts).toBe(254);
    });

    it('should return null for invalid IP format', () => {
        const result = calculateSubnet('999.999.999.999/24');
        expect(result).toBeNull();
    });

    it('should return null for invalid CIDR', () => {
        const result = calculateSubnet('192.168.1.1/33');
        expect(result).toBeNull();
    });
});
